import { Injectable, signal, Signal,computed, WritableSignal } from '@angular/core';
import { RoverPhoto } from '../../../RoverPhoto';
import { BehaviorSubject, Observable, combineLatest, from, map, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})


export class RoverPhotoRetrievalService {
      //service is structere to reduce the amount of HTTP requests made due to the limit set by nasas API
      //inital promises are stored in the Photos$ properties & Mainfest$

      //api_key=DEMO_KEY
      private key : string = "api_key=cL3nV3pm9mebhXYMAUoPbCZUDfNdKoPuHtl1x3Ca";
      private latestURL : string = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?${this.key}`;
      private mainfestURL : string = `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity/?${this.key}`;
      //handles Async Fetch to API
      //remove String Argument!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FOR DEV ONLY
      private Photos$ : Observable<RoverPhoto[]> = from(this.fetchLatestRoverPhotos("http://localhost:4200/assets/latest_photos.json"));

      //action stream for camera selection
      private cameraSelectedSubject = new BehaviorSubject<string>('ALL');
      private cameraSelected$ = this.cameraSelectedSubject.asObservable();
      //Observeable stream
      private RoverPhotosObser$ = combineLatest([this.Photos$, this.cameraSelected$]).pipe(tap(data => console.log(data))).pipe(
        map(([roverPhotos, cameraName]) => roverPhotos.filter((p)=> {if(cameraName != "ALL"){ return p.camera == cameraName} else { return p}})));
      
      //exposedobservables as Signal
      
      roverPhotos = toSignal<RoverPhoto[], RoverPhoto[]>(this.RoverPhotosObser$, {initialValue: []});
      availableCameras = computed(()=> this.getCurrentAvailableCameras(this.PhotosCallReturn()));
      cameraSelectionState = toSignal<string, string>(this.cameraSelectedSubject, {initialValue: "ALL"});
      //entire array of photos reguarless of camera selection
      PhotosCallReturn = toSignal<RoverPhoto[], RoverPhoto[]>(this.Photos$, {initialValue: []});


      //currently dislayed image
      //set to negative one to retrevie last in array
      indexOfDispalyed : WritableSignal<number> = signal(this.roverPhotos().length-1);
      displayedPhoto = computed(() => {
        if(this.indexOfDispalyed() > -1){return this.roverPhotos()[this.indexOfDispalyed()]}
        else if(this.roverPhotos()[this.roverPhotos().length -1]){return this.roverPhotos()[this.roverPhotos().length -1]}
        else return { id: -1, sol: -1, camera: "", imgSrc: "", earthDate: "", seen: false, initIndex: -1, }});

      //cameras
      cameraNameArray = ["ALL", "FHAZ", "RHAZ", "MAST", "CHEMCAM", 'MAHLI', "MARDI", "NAVCAM"];
      //hash of available cameras
      availableCameraMap: Signal<Record<string, boolean>> = computed(() => {
        let cameraAvailabilityMap: Record<string, boolean> = { "ALL": false, "FHAZ": false, "RHAZ": false, "MAST": false, "CHEMCAM": false, 'MAHLI': false, "MARDI": false, "NAVCAM": false };
        this.availableCameras().forEach(element => cameraAvailabilityMap[element] = true)
        return cameraAvailabilityMap
      });
      
  constructor() {
  }

  private async fetchLatestRoverPhotos(fetchURL : string = this.latestURL): Promise<RoverPhoto[]> {
    let photosArr : RoverPhoto[] = [];
    console.log("call")
    await fetch(fetchURL).then(response => {
                      if (!response.ok) {throw new Error(`HTTP error: ${response.status}.`)} else {return response.json()}})
                        .then(response => {
                              //clear camera index tables
                              if(response.latest_photos.length > 0){for(let x = 0; x < response.latest_photos.length; x++){
                                const pht : RoverPhoto = {id: response.latest_photos[x].id,
                                  sol: response.latest_photos[x].sol,
                                  camera: response.latest_photos[x].camera.name,
                                  imgSrc: response.latest_photos[x].img_src,
                                  earthDate: response.latest_photos[x].earth_date,
                                  seen: false,
                                  initIndex: x};
                                  photosArr.push(pht);
                              }}}).catch(e => {
                                alert(e + 'Could Not Connect to NASA');
                              });         
    return photosArr;
  }

  //changes rover photos and updates current camera state
  cameraSelected(cameraName : string):void {
    this.cameraSelectedSubject.next(cameraName)
    this.indexOfDispalyed.set(this.roverPhotos().length-1)
  }

  getCurrentAvailableCameras(photoArr: RoverPhoto[]) : string[]{
     let availableNames : string[] = ["ALL"];
     this.cameraNameArray.forEach(name => {if(photoArr.some((e)=> e.camera == name)){availableNames.push(name)}})
    return availableNames;
  }

  getRandomPhoto(){
    this.indexOfDispalyed.set(Math.floor(Math.random() * this.roverPhotos().length));
  }

  getNextPhoto(){
    const x = this.indexOfDispalyed() + 1;
    if(this.roverPhotos()[x]){
      this.indexOfDispalyed.set(x)
     }else{
      this.indexOfDispalyed.set(0)
     }
  }

  getPreviousPhoto(){
     const x = this.indexOfDispalyed() - 1;
    if(x < 0){
      this.indexOfDispalyed.set(this.roverPhotos().length-1)
    }else{
      this.indexOfDispalyed.set(x)
    }
  }

}



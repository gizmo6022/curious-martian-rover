import { Injectable, signal, Signal,computed } from '@angular/core';
import { RoverPhoto } from '../../../RoverPhoto';
import { BehaviorSubject, Observable, combineLatest, from, map, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})


export class RoverPhotoRetrievalService {

      //api_key=DEMO_KEY
      key : string = "api_key=cL3nV3pm9mebhXYMAUoPbCZUDfNdKoPuHtl1x3Ca";
      latestURL : string = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?${this.key}`;
      mainfestURL : string = `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity/?${this.key}`;

      //handles Async Fetch to API
      //remove String Argument!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FOR DEV ONLY
      Photos$ : Observable<RoverPhoto[]> = from(this.fetchLatestRoverPhotos("http://localhost:4200/assets/latest_photos.json"))
      PhotosCallSignal = toSignal<RoverPhoto[], RoverPhoto[]>(this.Photos$, {initialValue: []});


      //action stream
      cameraSelectedSubject = new BehaviorSubject<string>('ALL')
      cameraSelected$ = this.cameraSelectedSubject.asObservable();

      private RoverPhotosObser$ = combineLatest([this.Photos$, this.cameraSelected$]).pipe(tap(data => console.log(data))).pipe(
        map(([roverPhotos, cameraName]) => roverPhotos.filter((p)=> {if(cameraName != "ALL"){ return p.camera == cameraName} else { return p}})
      ));
      
      //expose observables as Signal
      roverPhotos = toSignal<RoverPhoto[], RoverPhoto[]>(this.RoverPhotosObser$, {initialValue: []});
      availableCameras = computed(()=> this.getCurrentCameras(this.PhotosCallSignal()));
      
  constructor() {
  }

  async fetchLatestRoverPhotos(fetchURL : string = this.latestURL): Promise<RoverPhoto[]> {
    let photosArr : RoverPhoto[] = [];
    console.log("call")
    await fetch(fetchURL).then(response => {
                      if (!response.ok) {throw new Error(`HTTP error: ${response.status}.`)} else {return response.json()}})
                        .then(response => {
                              //clear camera index tables
                              if(response.latest_photos.length > 0){for(let x = 0; x < response.latest_photos.length; x++){
                                let pht : RoverPhoto = {id: response.latest_photos[x].id,
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

  cameraSelected(cameraName : string):void {
    this.cameraSelectedSubject.next(cameraName)
  }

  getCurrentCameras(photoArr: RoverPhoto[]) : string[]{
     let names = ["FHAZ", "RHAZ", "MAST", "CHEMCAM", 'MAHLI', "MARDI", "NAVCAM"]
     let availableNames : string[] = ["ALL"];
     names.forEach(name => {if(photoArr.some((e)=> e.camera == name)){availableNames.push(name)}})
    return availableNames;
  }

}



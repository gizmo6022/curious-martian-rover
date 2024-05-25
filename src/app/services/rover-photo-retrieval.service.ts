import { Injectable, inject } from '@angular/core';
import { RoverPhoto } from '../../../RoverPhoto';

@Injectable({
  providedIn: 'root'
})


export class RoverPhotoRetrievalService {

      //api_key=DEMO_KEY
      key : string = "api_key=DEMO_KEY";
      latestURL : string = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?${this.key}`;
      mainfestURL : string = `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity/?${this.key}`;
      //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=cL3nV3pm9mebhXYMAUoPbCZUDfNdKoPuHtl1x3Ca
  constructor() {
    console.log(this.getLatestRoverPhotos())
     
  }

  async getLatestRoverPhotos(fetchURL : string = this.latestURL): Promise<RoverPhoto[]> {
    let photosArr : RoverPhoto[] = [];
    fetch(fetchURL).then(response => {
                      if (!response.ok) {throw new Error(`HTTP error: ${response.status}.`)} else {return response.json()}})
                        .then(response => {
                              if(response.latest_photos.length > 0){for(let x = 0; x < response.latest_photos.length; x++){
                                let pht : RoverPhoto = {id: response.latest_photos[x].id,
                                  sol: response.latest_photos[x].sol,
                                  camera: response.latest_photos[x].camera.name,
                                  imgSrc: response.latest_photos[x].img_src,
                                  earthDate: response.latest_photos[x].earth_date};
                                  photosArr.push(pht);
                              }}}).catch(e => {
                                alert(e + 'Could Not Connect to NASA');
                              });         
    return photosArr;
  }
}

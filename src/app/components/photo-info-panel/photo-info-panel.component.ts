import { Component, computed } from '@angular/core';
import { RoverPhotoRetrievalService } from '../../services/rover-photo-retrieval.service';

@Component({
  selector: 'app-photo-info-panel',
  standalone: true,
  imports: [],
  template: `
  <div id ="photo-btns"class = "encapsulated">
  <div id = 'img-label'>
    <p>ID: <span>{{displayedPhoto().id}}</span> </p>
    <p>Camera: <span>{{displayedPhoto().camera}}</span> </p>
    <p>Sole: <span>{{displayedPhoto().sol}} </span></p>
    <p> EarthDate: <span>{{displayedPhoto().earthDate}}</span></p>
  </div>
<p id ="camera-name">{{getCameraFullName(cameraSelectionState())}}</p>

<div id ="index-photo-ind"> {{currentPhotoNumber()}}/{{roverPhotos().length}} </div>
<button (click) = "onPreviousRequest()" id="next-btn">←</button>
<button (click) = "onNextRequest()" id="prev-btn">→</button> 
<button (click) = "onRandomizeButton()" id="rand-btn">Randomize</button>`,
  styleUrl: './photo-info-panel.component.css'
})
export class PhotoInfoPanelComponent {
  displayedPhoto = this.photoServ.displayedPhoto;

  roverPhotos = this.photoServ.roverPhotos;

  currentPhotoNumber = computed(() =>{if(this.photoServ.indexOfDispalyed() < 0 ){ return this.roverPhotos().length
  }else{return this.photoServ.indexOfDispalyed()+1}});

  cameraSelectionState = this.photoServ.cameraSelectionState;

  constructor(private photoServ : RoverPhotoRetrievalService){

  }

  onNextRequest(){
    this.photoServ.getNextPhoto()
  }
  onPreviousRequest(){
    this.photoServ.getPreviousPhoto()
  }

  getCameraFullName(name : string) : string {
    switch (name){
    case 'FHAZ': 
      return 'Front Hazard Avoidance Camera';
    case 'RHAZ':
      return'Rear Hazard Avoidance Camera';
    case 'MAST' :
      return "Mast Camera";
    case 'CHEMCAM' :
      return'Chemistry and Camera Complex';		
    case 'MAHLI' :	
      return 'Mars Hand Lens Imager';
    case "MARDI" :
      return'Mars Descent Imager';		
    case "NAVCAM" :	
      return'Navigation Camera';
    default :
    return "All Cameras";
    }
  }
  onRandomizeButton(){
    this.photoServ.getRandomPhoto()
  }
}

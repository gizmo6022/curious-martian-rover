import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoverPhotoRetrievalService } from '../../services/rover-photo-retrieval.service';
import { RoverPhoto } from '../../../../RoverPhoto';
import { PhotoSelectionContainerComponent } from '../../components/photo-selection-container/photo-selection-container.component';
import { CameraWheelComponent } from '../../components/camera-wheel/camera-wheel.component';
import { DispalyPhotoComponent } from '../../components/dispaly-photo/dispaly-photo.component';


@Component({
  selector: 'app-curiosity-rover-photos',
  standalone: true,
  imports: [CommonModule, PhotoSelectionContainerComponent, CameraWheelComponent, DispalyPhotoComponent],
  template: `
    <div class = "encapsulated" id = 'current-img'>
      <app-dispaly-photo [displayedPhoto]="displayedPhoto()"/>
    </div>

     

    <div id = "photo-control-panel">
    
    <div id ="photo-btns"class = "encapsulated">
    <p id ="camera-name">{{getCameraFullName(cameraSelectionState())}}</p>
    <div id ="index-photo-ind"> {{currentPhotoNumber()}}/{{roverPhotos().length}} </div>
    <button (click) = "onPreviousRequest()" id="next-btn">←</button>
    <button (click) = "onNextRequest()" id="prev-btn">→</button> 
    <button (click) = "onRandomizeButton()" id="rand-btn">Randomize</button>
    </div>
    <app-camera-wheel [cameraNames] = "cameraNameArray" [isAvailable] = "availableCaemraMap()" [cameraSelectionState] = "cameraSelectionState" (cameraPanelClickEvent)="onCameraSelection($event)"/>
    </div>
    `,
  styleUrl: './curiosity-rover-photos.component.css'
})
export class CuriosityRoverPhotosComponent {

  displayedPhoto = this.photoServ.displayedPhoto;
  //Camera Signal from obseravable
  availableCameras = this.photoServ.availableCameras;
  //list of camera names
  cameraNameArray =  this.photoServ.cameraNameArray;
  //signal Map for if that camera is available, computed from available cameras.
  availableCaemraMap =this.photoServ.availableCameraMap;
  //camera Current State
  cameraSelectionState = this.photoServ.cameraSelectionState;
  //array of photos filtered by current camera selection
  roverPhotos = this.photoServ.roverPhotos;

  currentPhotoNumber = computed(() =>{if(this.photoServ.indexOfDispalyed() < 0 ){ return this.roverPhotos().length
  }else{return this.photoServ.indexOfDispalyed()+1}});


  constructor(private photoServ: RoverPhotoRetrievalService) {
  }

  onCameraSelection(camera: string): void {
    this.photoServ.cameraSelected(camera);
  }
  onRandomizeButton(){
    this.photoServ.getRandomPhoto()
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

  onNextRequest(){
    this.photoServ.getNextPhoto()
  }
  onPreviousRequest(){
    this.photoServ.getPreviousPhoto()
  }

}

import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoverPhotoRetrievalService } from './services/rover-photo-retrieval.service';
import { RoverPhoto } from '../../RoverPhoto';
import { PhotoSelectionContainerComponent } from './components/photo-selection-container/photo-selection-container.component';
import { CameraWheelComponent } from './components/camera-wheel/camera-wheel.component';
import { DispalyPhotoComponent } from './components/dispaly-photo/dispaly-photo.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PhotoSelectionContainerComponent, CameraWheelComponent, DispalyPhotoComponent],
  template: `
  <h1>The Curious Martian Rover</h1>
  <app-camera-wheel [cameraNames] = "cameraNameArray" [isAvailable] = "availableCaemraMap()" [cameraSelectionState] = "cameraSelectionState" (cameraPanelClickEvent)="onCameraSelection($event)"/>
  <div>{{currentPhotoNumber()}}/{{roverPhotos().length}}</div>
  <button (click) = "onNextRequest()">→</button> 
  <button (click) = "onPreviousRequest()">←</button>
  <button (click) = "onRandomizeButton()">Randomize</button>
  <app-dispaly-photo [displayedPhoto]="displayedPhoto()">`,
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit, OnDestroy {
  title = 'curious-martian-rover';
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

  ngOnInit(): void {
  }

  ngOnDestroy() {
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
    return "";
    }
  }

  onNextRequest(){
    this.photoServ.getNextPhoto()
  }
  onPreviousRequest(){
    this.photoServ.getPreviousPhoto()
  }
}




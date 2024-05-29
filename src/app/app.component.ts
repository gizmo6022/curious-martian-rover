import { Component, OnDestroy, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoverPhotoRetrievalService } from './services/rover-photo-retrieval.service';
import { RoverPhoto } from '../../RoverPhoto';
import { PhotoSelectionContainerComponent } from './components/photo-selection-container/photo-selection-container.component';
import { CameraWheelComponent } from './components/camera-wheel/camera-wheel.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,PhotoSelectionContainerComponent, CameraWheelComponent],
  template: `
  <div id = "camera-wheel-wrapper">
  <app-camera-wheel [availableCameras] = availableCameras/> 
  </div>
  @for(photo of roverPhotos(); track photo.id){  
    <p>{{photo.id}} </p>}
            <app-photo-selection-container [roverPhotos]="roverPhotos"></app-photo-selection-container>
            <p>{{displayedPhoto.id}}</p>
            @for(photo of availableCameras(); track photo){  
    <p>{{photo}} </p>}
            `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'curious-martian-rover';
  displayedRoverCamera = signal<String>("ALL");
  displayedPhoto: RoverPhoto = {id: -1, sol: -1, camera: "", imgSrc: "", earthDate: "", seen: false, initIndex: -1,};
  availableCameras = this.photoServ.availableCameras;
  cameraNameArray = ["ALL", "FHAZ", "RHAZ", "MAST", "CHEMCAM", 'MAHLI', "MARDI", "NAVCAM"];
  roverPhotos = this.photoServ.roverPhotos;
  
  constructor(private photoServ : RoverPhotoRetrievalService){}



  ngOnInit(): void{
  }

  ngOnDestroy(){
  }

  onCameraSelection(camera : string):void {
    this.photoServ.cameraSelected(camera);
  }
}

// ALL
// FHAZ
// RHAZ
// MAST
// CHEMCAM
// MAHLI
// MARDI
// NAVCAM



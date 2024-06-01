import { Component, OnDestroy, OnInit, Signal, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoverPhotoRetrievalService } from './services/rover-photo-retrieval.service';
import { RoverPhoto } from '../../RoverPhoto';
import { PhotoSelectionContainerComponent } from './components/photo-selection-container/photo-selection-container.component';
import { CameraWheelComponent } from './components/camera-wheel/camera-wheel.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PhotoSelectionContainerComponent, CameraWheelComponent],
  template: `
  <h1>The Curious Martian Rover</h1>
  <app-camera-wheel [cameraNames] = "cameraNameArray" [isAvailable] = "isAvailable()" [cameraSelectionState] = "cameraSelectionState" (cameraChangeEvent)="onCameraSelection($event)"/> 



  <!-- @for(photo of roverPhotos(); track photo.id){  
    <p>{{photo.id}} </p>} -->
            <app-photo-selection-container [roverPhotos]="roverPhotos"></app-photo-selection-container>
            <p>{{displayedPhoto.id}}</p>
            @for(photo of availableCameras(); track photo){  
    <p>{{photo}} </p>}
    <p>{{this.cameraSelectionState()}} </p>
            `,
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit, OnDestroy {
  title = 'curious-martian-rover';
  displayedPhoto: RoverPhoto = { id: -1, sol: -1, camera: "", imgSrc: "", earthDate: "", seen: false, initIndex: -1, };

  //Camera Signal from obseravable
  availableCameras = this.photoServ.availableCameras;
  //list of camera names
  cameraNameArray = ["ALL", "FHAZ", "RHAZ", "MAST", "CHEMCAM", 'MAHLI', "MARDI", "NAVCAM"];
  //signal Map for if that camer is available, computed from available cameras.
  isAvailable: Signal<Record<string, boolean>> = computed(() => {
    let cameraAvailabilityMap: Record<string, boolean> = { "ALL": false, "FHAZ": false, "RHAZ": false, "MAST": false, "CHEMCAM": false, 'MAHLI': false, "MARDI": false, "NAVCAM": false };
    this.availableCameras().forEach(element => cameraAvailabilityMap[element] = true)
    return cameraAvailabilityMap
  });
  //camera Current State
  cameraSelectionState = signal("ALL");

  roverPhotos = this.photoServ.roverPhotos;



  constructor(private photoServ: RoverPhotoRetrievalService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  onCameraSelection($event : Event): void {
    console.log($event)
    //this.photoServ.cameraSelected($event);
  }
}



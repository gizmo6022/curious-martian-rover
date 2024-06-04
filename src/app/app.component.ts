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
  <app-camera-wheel [cameraNames] = "cameraNameArray" [isAvailable] = "availableCaemraMap()" [cameraSelectionState] = "cameraSelectionState" (cameraPanelClickEvent)="onCameraSelection($event)"/>
  <button (click) = "onRandomizeButton()"></button>
  <img src="{{displayedPhoto().imgSrc}}"/>         `,
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

  roverPhotos = this.photoServ.roverPhotos;


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
}




import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoverPhotoRetrievalService } from '../../services/rover-photo-retrieval.service';
import { RoverPhoto } from '../../../../RoverPhoto';
import { PhotoSelectionContainerComponent } from '../../components/photo-selection-container/photo-selection-container.component';
import { CameraWheelComponent } from '../../components/camera-wheel/camera-wheel.component';
import { DispalyPhotoComponent } from '../../components/dispaly-photo/dispaly-photo.component';
import { PhotoInfoPanelComponent } from '../photo-info-panel/photo-info-panel.component';


@Component({
  selector: 'app-curiosity-rover-photos',
  standalone: true,
  imports: [CommonModule, PhotoSelectionContainerComponent,PhotoInfoPanelComponent, CameraWheelComponent, DispalyPhotoComponent],
  template: `
    <div class = "encapsulated" id = 'current-img'>
      <app-dispaly-photo [displayedPhoto]="displayedPhoto()"/>
    </div>
    <app-photo-info-panel/>
    <app-camera-wheel [cameraNames] = "cameraNameArray" [isAvailable] = "availableCaemraMap()" [cameraSelectionState] = "cameraSelectionState" (cameraPanelClickEvent)="onCameraSelection($event)"/>
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


}

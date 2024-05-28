import { Component, OnDestroy, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoverPhotoRetrievalService } from './services/rover-photo-retrieval.service';
import { RoverPhoto } from '../../RoverPhoto';
import { PhotoSelectionContainerComponent } from './components/photo-selection-container/photo-selection-container.component';
import { BehaviorSubject, Observable, Subscription, from, of, tap } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,PhotoSelectionContainerComponent],
  template: `@for(photo of roverPhotos(); track photo.id){
    <p>{{photo.id}} </p>}
            <app-photo-selection-container [roverPhotos]="roverPhotos"></app-photo-selection-container>
            <p>{{displayedPhoto.id}}</p>
            `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'curious-martian-rover';
  displayedRoverCamera: WritableSignal<String>= signal<String>("ALL");
  displayedPhoto: RoverPhoto = {id: -1, sol: -1, camera: "", imgSrc: "", earthDate: "", seen: false, initIndex: -1,};

  subscriptions : Subscription = new Subscription;
  roverPhotos = this.photoServ.roverPhotos;
  
  constructor(private photoServ : RoverPhotoRetrievalService){}



  ngOnInit(): void{    
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }

  onCameraSelection(camera : string):void {
    this.photoServ.cameraSelected(camera);
  }
}

// ALL : RoverPhoto[];
// FHAZ : RoverPhoto[];
// RHAZ : RoverPhoto[];
// MAST : RoverPhoto[];
// CHEMCAM: RoverPhoto[];	
// MAHLI: RoverPhoto[];
// MARDI: RoverPhoto[];
// NAVCAM: RoverPhoto[];



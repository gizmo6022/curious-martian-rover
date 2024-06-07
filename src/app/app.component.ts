import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoverPhotoRetrievalService } from './services/rover-photo-retrieval.service';
import { CuriosityRoverPhotosComponent } from './components/curiosity-rover-photos/curiosity-rover-photos.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CuriosityRoverPhotosComponent],
  template: `
  <h1>The Curious Martian Rover</h1>
  <h2>Explore the latest photos from NASA's Curiosity Rover</h2>
  <app-curiosity-rover-photos></app-curiosity-rover-photos>
  `,
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{
  title = 'curious-martian-rover';

  constructor(private photoServ: RoverPhotoRetrievalService) {
  }

  ngOnInit(): void {
  }
}




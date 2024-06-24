import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { RoverPhotoRetrievalService } from './services/rover-photo-retrieval.service';
import { CuriosityRoverPhotosComponent } from './components/curiosity-rover-photos/curiosity-rover-photos.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CuriosityRoverPhotosComponent, RouterModule, NavbarComponent],
  template: `
  <app-navbar />
  <h2>Explore the latest photos from NASA's Curiosity Rover</h2>
  <router-outlet></router-outlet>
  <!-- <app-curiosity-rover-photos></app-curiosity-rover-photos> -->
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




import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoverPhotoRetrievalService } from './services/rover-photo-retrieval.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'curious-martian-rover';

  ngOnInit(){
    let photoServ = new RoverPhotoRetrievalService;
  }
}

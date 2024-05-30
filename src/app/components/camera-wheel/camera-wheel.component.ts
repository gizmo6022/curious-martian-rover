import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-camera-wheel',
  standalone: true,
  imports: [CommonModule],
  template:`  <div class ="spinner-shader" id="spinner-light"></div>
  <div class ="spinner-shader" id="spinner-shadow"></div>
  <div #panelRef id="activity-wheel-wrapper">
    @for(camera of cameraNames; track camera;){
      <div class="camera-panel" id ="camera{{$index}}" [style]="rotatePanel($index)" [ngClass] = "panelClass(camera)"><span>{{camera}}</span></div>
    }
  </div>
   <div id="spinner-center"></div>
   <div id="spinner-shroud"></div>
    <div id="spinner-needle"></div>`,
  styleUrl: './camera-wheel.component.css'
})
export class CameraWheelComponent implements OnInit, AfterViewInit {
    @Input() cameraNames: string[] = [];
    @Input()  isAvailable : Record<string, boolean> = {
    }
    cameraNameArray : string[] = [];

    panelClass(camera: string) {
      return {
        "available" : this.isAvailable[camera]
      }
    }


    rotatePanel(x : number): string {
      let degreesOfArc = (360/this.cameraNames.length) * x;
      let y = `rotate: -${degreesOfArc}deg; zIndex : ${x};`
      return y;
    }

    


    ngOnInit(){
    }
    
    ngAfterViewInit(): void {
    }
    
}



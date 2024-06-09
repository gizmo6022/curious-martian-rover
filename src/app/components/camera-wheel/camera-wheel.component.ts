import { Component, OnInit, Input, AfterViewInit, Signal, signal, computed, EventEmitter, Output } from '@angular/core';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-camera-wheel',
  standalone: true,
  imports: [CommonModule],
  template:`
    <div id = "wheel-wrapper">
    <div id = "cameraWheel">
      <div class ="spinner-shader" id="spinner-light"></div>
      <div class ="spinner-shader" id="spinner-shadow"></div>
      <div id="spinner-center"></div>
      <div #panelRef id="camera-wheel-inner-wrapper" [style]="cameraRotation()">
        @for(camera of cameraNames; track camera;){
          <div class="camera-panel" id ="camera{{$index}}" [style]="rotatePanel($index)" [ngClass] = "panelClass(camera)">
            <span (click)="cameraPanelClick(camera)">{{camera}}</span>
          </div>
        }
      </div>
      <div id="spinner-needle"></div>
    </div>
    <div id = "buttonWrapper">
      <button class = "dirButtons" (click)="rotatePanelArrowButton(true)"> ↑ </button>
      <button class = "dirButtons"(click)="rotatePanelArrowButton(false)"> ↓ </button>
    </div>
    </div>
      `,
  styleUrl: './camera-wheel.component.css'
})
export class CameraWheelComponent implements OnInit, AfterViewInit {
    @Input() cameraNames: string[] = [];
    @Input() isAvailable : Record<string, boolean> = {};
    @Input() cameraSelectionState: Signal<string> = signal("ALL" as string);
    @Output() cameraPanelClickEvent = new EventEmitter<string>;

    //(rotates wheel): computed rotation of the wrapper div in order to properly display current camera
    cameraRotation = computed(()=>{
      if(this.isAvailable[this.cameraSelectionState()]){
      const x = this.cameraNames.indexOf(this.cameraSelectionState()) * (360/this.cameraNames.length);
      return`rotate: ${x}deg;`} else {return ""};
    });
    

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

    cameraPanelClick(x : string){
      this.cameraPanelClickEvent.emit(x);
    }

    ngOnInit(){
    }
    
    ngAfterViewInit(): void {
    }

    rotatePanelArrowButton(isUp: boolean){
      //get index of current camera
      let x = this.cameraNames.indexOf(this.cameraSelectionState())
      if(isUp){
          //increment to next
          x++;
          //check againts is availabel map
          while(!this.isAvailable[this.cameraNames[x]]){
            if(x <= (this.cameraNames.length-1)){
              x++
            } else {
              x = 0
            }
          }
          this.cameraPanelClickEvent.emit(this.cameraNames[x]);
      //same as above but decrmenting
      }else{
        x--;
        while(!this.isAvailable[this.cameraNames[x]]){
          if(x > -1){
            x--;
          } else {
            x = this.cameraNames.length
          }
        }
        this.cameraPanelClickEvent.emit(this.cameraNames[x]);
      }
    }
}



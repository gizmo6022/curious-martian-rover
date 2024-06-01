import { Component, OnInit, Input, AfterViewInit, Signal, signal, computed, EventEmitter, Output } from '@angular/core';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-camera-wheel',
  standalone: true,
  imports: [CommonModule],
  template:`
    <div id = "cameraWheel">
    <div class ="spinner-shader" id="spinner-light"></div>
    <div class ="spinner-shader" id="spinner-shadow"></div>
    <div id="spinner-center"></div>
    <div id="spinner-shroud"></div>
    <div #panelRef id="activity-wheel-wrapper" [style]="cameraRotation()">
      @for(camera of cameraNames; track camera;){
        <div class="camera-panel" id ="camera{{$index}}" [style]="rotatePanel($index)" [ngClass] = "panelClass(camera)">
        <span (click)="cameraPanelClick(camera)">{{camera}}</span>
      </div>
      }
    </div>
      <div id="spinner-needle"></div>
      </div>
      <button (click)="rotatePanelArrowButton(true)"> => </button>
      <button (click)="rotatePanelArrowButton(false)"> <=</button>
      `,
  styleUrl: './camera-wheel.component.css'
})
export class CameraWheelComponent implements OnInit, AfterViewInit {
    @Input() cameraNames: string[] = [];
    @Input() isAvailable : Record<string, boolean> = {};
    @Input() cameraSelectionState = signal("ALL" as string);
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
      console.log(x)
    }

    ngOnInit(){
      //setTimeout(()=>this.cameraSelectionState.set("NAVCAM"),1000)
    }
    
    ngAfterViewInit(): void {
    }

    rotatePanelArrowButton(isUp: boolean){
      let x = this.cameraNames.indexOf(this.cameraSelectionState())
      isUp
      if(isUp){
        this.cameraPanelClickEvent.emit(this.getNextAvailable(x));
      }else{
        this.cameraPanelClickEvent.emit(this.getPreviousAvailable(x));
      }
    }
    
    getNextAvailable(x : number) : string {
      x++;
      while(this.isAvailable[this.cameraNames[x]] == false){
        console.log(x)
        if(x < this.cameraNames.length-1){
          x++
        } else {
          x = 0
        }
      }
      return this.cameraNames[x];}

    getPreviousAvailable(x : number) : string {
        x--;
        while(!this.isAvailable[this.cameraNames[x]]){
          if(x > -1){
            x--;
          } else {
            x = this.cameraNames.length
          }
        }
        return this.cameraNames[x]
      }
}



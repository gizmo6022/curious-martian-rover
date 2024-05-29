import { Component, OnInit, Input, signal, Signal, AfterViewInit, effect } from '@angular/core';

@Component({
  selector: 'app-camera-wheel',
  standalone: true,
  imports: [],
  template:`  <div class ="spinner-shader" id="spinner-light"></div>
  <div class ="spinner-shader" id="spinner-shadow"></div>
  <div id="activity-wheel-wrapper">
  @for(camera of availableCameras(); track camera) {
      <div class = "camera-item" id ="camera{{$index}}">{{camera}}</div>
   } 
  </div>
   <div id="spinner-center"></div>
   <div id="spinner-shroud"></div>
    <div id="spinner-needle"></div>`,
  styleUrl: './camera-wheel.component.css'
})
export class CameraWheelComponent implements OnInit, AfterViewInit {
    @Input() availableCameras: Signal<String[]>= signal<String[]>([]);
    constructor(){
    }

    ngOnInit(){
    }

    ngAfterViewInit(): void {
      this.wheelPanelsStyling()
    }


    wheelPanelsStyling():void{
      let panels = document.getElementsByClassName("camera-item");
      let container = document.getElementsByTagName("app-camera-wheel")[0] as HTMLElement;
      if(panels && container){
        let pHeight = ((container.offsetHeight/4)*2*(3.14))/panels.length;
        let i = 0;
        let degreesOfArc = 360/panels.length;
    
        while(panels.item(i)){
          let p = panels.item(i) as HTMLElement ?? panels.item(i);
          p.style.height = `${pHeight}px`;
          p.style.zIndex = `${i}`;
          p.style.top =`-${pHeight/2}px`
          p.style.rotate =`-${degreesOfArc*i}deg`;
          p.style.fontSize = `${10}pt`;
          
          i++;
          console.log("heyy")
        }
      }
      
      }

    
}



import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RoverPhoto } from '../../../../RoverPhoto';
@Component({
  selector: 'app-dispaly-photo',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
  <div id = "img-wrapper" class = "{{wrapperClass}}">
    <div class = "{{closeDivClass}}" (click) = 'minImg()'><span>☒</span></div>
        <img id = "display-image" src="{{displayedPhoto.imgSrc}}" (click) ='magnifyImg()' priority>
  </div> `,
  styleUrl: './dispaly-photo.component.css'
})
export class DispalyPhotoComponent {
  @Input() displayedPhoto : RoverPhoto = {id:-1, sol:-1, camera:"", imgSrc:"",earthDate:"",seen:false,initIndex:-1};
  wrapperClass = "";
  //hidden class defined in main Style Sheet
  closeDivClass = "hidden";
constructor(){
}

magnifyImg(){
    this.wrapperClass = "magnified-img";
    this.closeDivClass = "close-div";
}
minImg(){
  this.wrapperClass = "";
  this.closeDivClass = "hidden";
}
}

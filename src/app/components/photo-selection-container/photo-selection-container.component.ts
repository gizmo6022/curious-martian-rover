import { Component, Input,Signal, signal } from '@angular/core';
import { RoverPhoto } from '../../../../RoverPhoto';

@Component({
  selector: 'app-photo-selection-container',
  standalone: true,
  imports: [],
  template: `
    <p>
      photo-selection-container works!
    </p>
    <button (click)="edit()">CLICK</button>
  `,
  styleUrl: './photo-selection-container.component.css'
})
export class PhotoSelectionContainerComponent {
  @Input() roverPhotos : Signal<RoverPhoto[]> = signal([])
  x: number =69;

  constructor(){}

  edit(){
    this.roverPhotos()[0].id = this.x;
    this.x++;
    console.log(this.roverPhotos);
  }
}

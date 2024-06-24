import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
  <nav id="navbar">
  <div class="navbar-title">
    <p>Curious Martian Rover</p>
  </div>
  <ul class="navbar-links">
    <div id="marker" [style] = "markerTransition"></div>
    <li class = "home-link" (mouseover) = "moveMarkerOn(0)" (mouseout) = "onMarkerOut()"><a routerLink="/">Home</a></li>
    <li class = "manifest-link" (mouseover) = "moveMarkerOn(1)" (mouseout) = "onMarkerOut()" ><a routerLink="manifest">Manifest</a></li>
    <li calss = "camera-link" (mouseover) = "moveMarkerOn(2)" (mouseout) = "onMarkerOut()"><a routerLink="about">Cameras</a></li>
    <li calss = "about-link" (mouseover) = "moveMarkerOn(3)" (mouseout) = "onMarkerOut()"><a routerLink="about">About</a></li>
  </ul>
  <div class="navbar-actions">
    <!-- Add login/logout buttons or user-related actions here -->
  </div>
</nav>
`,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  markerTransition: string = "marker";

  moveMarkerOn(x: number){
    const y= x*7
    this.markerTransition = `transform: translate(${y}em, 0em); width : 7em`;
  }
  onMarkerOut(){
    this.markerTransition = "";
  }
}

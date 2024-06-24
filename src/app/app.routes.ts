import { Routes } from '@angular/router';
import { CuriosityRoverPhotosComponent } from './components/curiosity-rover-photos/curiosity-rover-photos.component';
import { ManifestComponent } from './components/manifest/manifest.component';

export const routes: Routes = [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: CuriosityRoverPhotosComponent, title: 'Curious Martian Rover',},
        { path: 'manifest', component: ManifestComponent },
        { path: 'about', component: CuriosityRoverPhotosComponent },
];
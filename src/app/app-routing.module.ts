import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotifySearchComponent } from './spotify-search/spotify-search.component';
import { RaceComponent } from './race/race.component';
import { RaceService } from './services/race/race.service';
import { ResultsComponent } from './results/results.component';
import { AlbumComponent } from './album/album.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SpotifySearchComponent,
  },
  { path: 'race', component: RaceComponent, canActivate: [RaceService] },
  { path: 'results', component: ResultsComponent, canActivate: [RaceService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

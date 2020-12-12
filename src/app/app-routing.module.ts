import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotifySearchComponent } from './components/spotify-search/spotify-search.component';
import { RaceComponent } from './components/race/race.component';
import { RaceService } from './services/race/race.service';
import { ResultsComponent } from './components/results/results.component';
import { AlbumComponent } from './components/album/album.component';
import { CustomResultsComponent } from './custom-results/custom-results.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SpotifySearchComponent,
  },
  { path: 'race', component: RaceComponent, canActivate: [RaceService] },
  { path: 'results', component: ResultsComponent, canActivate: [RaceService] },
  {
    path: 'custom-results',
    component: CustomResultsComponent,
    canActivate: [RaceService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

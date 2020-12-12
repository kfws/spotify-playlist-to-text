import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifySearchComponent } from './components/spotify-search/spotify-search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RaceComponent } from './components/race/race.component';
import { ResultsComponent } from './components/results/results.component';
import { AlbumComponent } from './components/album/album.component';
import { CustomRankingComponent } from './components/custom-ranking/custom-ranking.component';
import { SongsComponent } from './components/songs/songs.component';
import { CustomResultsComponent } from './custom-results/custom-results.component';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SpotifySearchComponent,
    RaceComponent,
    ResultsComponent,
    AlbumComponent,
    CustomRankingComponent,
    SongsComponent,
    CustomResultsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ...materialModules,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

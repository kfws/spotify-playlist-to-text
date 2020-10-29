import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnvService } from '../services/env/env.service';
import { ApiService } from '../services/api/api.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RaceService } from '../services/race/race.service';
import { Track } from '../models/track.model';

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.scss'],
})
export class SpotifySearchComponent implements OnInit {
  playlistForm: FormGroup;
  resultLoading = false;
  songs: Track[] = [];

  constructor(
    private readonly envService: EnvService,
    private readonly apiService: ApiService,
    private readonly dialog: MatDialog,
    private readonly raceService: RaceService
  ) {
    this.playlistForm = new FormGroup({
      playlist: new FormControl('', Validators.required),
      playlistResults: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (!window.location.hash) {
      const state = Math.round(Math.random() * 100000).toString();
      localStorage.setItem('state', state);
      window.location.replace(
        `https://accounts.spotify.com/authorize` +
          `?response_type=token` +
          `&client_id=${this.envService.clientID}` +
          `&scope=${this.envService.permissions}` +
          `&redirect_uri=${this.envService.url}` +
          `&state=${state}`
      );
    } else {
      this.apiService.parseHash(window.location.hash);
    }
  }

  get results() {
    return this.playlistForm.controls.playlistResults;
  }

  get playlist(): string {
    return this.playlistForm.controls.playlist.value;
  }

  get hasSongs(): boolean {
    console.log(this.results.value?.split('\n')?.filter(Boolean));
    return this.results.value?.split('\n')?.filter(Boolean).length;
  }

  onSearch() {
    const playlist = this.playlist.replace('spotify:playlist:', '');
    this.resultLoading = true;
    this.apiService.startGettingPlaylistTracks(playlist).then((res) => {
      this.songs = res;
      this.results.setValue(
        res
          .map((item) => `${item.name} by ${item.artists.join(', ')}`)
          .join('\n')
      );
      this.resultLoading = false;
    });
  }

  pickRandomSong() {
    if (this.songs.length) {
      const song = this.songs[Math.floor(Math.random() * this.songs.length)];
      this.dialog.open(SpotifyDialogComponent, {
        width: '250px',
        data: { name: song.name, artists: song.artists.join(', ') },
      });
    }
  }

  showRace() {
    this.raceService.goToRace(this.songs);
  }
}

@Component({
  selector: 'app-spotify-dialog',
  template: `<h1 mat-dialog-title>{{ data.name }} by {{ data.artists }}</h1>`,
})
export class SpotifyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SpotifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; artists: string }
  ) {}
}

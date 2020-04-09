import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnvService } from '../env/env.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.scss'],
})
export class SpotifySearchComponent implements OnInit {
  playlistForm: FormGroup;
  resultLoading = false;

  constructor(
    private readonly envService: EnvService,
    private readonly apiService: ApiService
  ) {
    this.playlistForm = new FormGroup({
      playlist: new FormControl('', Validators.required),
      playlistResults: new FormControl([]),
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

  onSearch() {
    const playlist = this.playlist.replace('spotify:playlist:', '');
    this.resultLoading = true;
    this.apiService.startGettingPlaylistTracks(playlist).then((res) => {
      this.results.setValue(
        res
          .map((item) => `${item.name} by ${item.artists.join(', ')}`)
          .join('\n')
      );
      this.resultLoading = false;
    });
  }
}

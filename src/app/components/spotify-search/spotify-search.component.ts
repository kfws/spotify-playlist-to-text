import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { EnvService } from '../../services/env/env.service';

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.scss'],
})
export class SpotifySearchComponent implements OnInit {
  constructor(
    private readonly envService: EnvService,
    private readonly apiService: ApiService
  ) {}

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
}

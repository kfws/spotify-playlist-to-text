import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor() {}

  get clientID() {
    return 'a43a831f80d24cf79bf7c177fae2f16d';
  }

  get permissions() {
    return encodeURIComponent(
      'playlist-read-collaborative playlist-read-private'
    );
  }

  get url() {
    return encodeURIComponent(
      environment.production === true
        ? 'https://spotify-to-text.netlify.com/'
        : 'http://localhost:4200/'
    );
  }

  get spotifyURL() {
    return 'https://api.spotify.com/v1';
  }
}

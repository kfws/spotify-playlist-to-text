import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env/env.service';

interface PlaylistResponse {
  items: {
    track: {
      artists: { name: string }[];
      name: string;
    };
  }[];
  next: string | null;
}

export interface Track {
  artists: string[];
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  hashData: Map<string, string> = new Map();
  token: string;
  tokenType: string;
  loading = false;

  allTracks: any[];
  constructor(
    private readonly http: HttpClient,
    private readonly envService: EnvService
  ) {}

  parseHash(hash: string): void {
    const noHash = hash.slice(1).split('&');
    for (const item of noHash) {
      const [key, value] = item.split('=');
      this.hashData.set(key, value);
      if (key === 'access_token') {
        this.token = value;
      }
      if (key === 'token_type') {
        this.tokenType = value;
      }
    }
  }

  async startGettingPlaylistTracks(playlist: string): Promise<Track[]> {
    this.allTracks = [];
    this.loading = true;
    return this.getPlaylistTracks(
      `${this.envService.spotifyURL}/playlists/${playlist}/tracks`
    );
  }

  async getPlaylistTracks(next: string): Promise<Track[]> {
    do {
      next = await this.http
        .get(next)
        .toPromise()
        .then((tracks: PlaylistResponse) => {
          for (const item of tracks.items) {
            const track = item.track;
            this.allTracks.push({
              artists: track.artists.map((artist) => artist.name),
              name: track.name,
            });
          }
          return tracks.next;
        })
        .catch(async (err) => {
          console.log('caught error', err);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return next;
        });
    } while (next !== null);
    this.loading = false;
    return this.allTracks;
  }
}

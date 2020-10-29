import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Track } from '../models/track.model';
import { EnvService } from '../services/env/env.service';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent implements OnInit {
  playlistForm: FormGroup;
  resultLoading = false;
  songs: Track[] = [];

  constructor(
    private readonly envService: EnvService,
    private readonly apiService: ApiService
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
    return this.results.value?.split('\n').length > 0;
  }

  onSearch() {
    const playlist = this.playlist.replace('spotify:playlist:', '');
    this.resultLoading = true;
    this.apiService.startGettingPlaylistTracks(playlist).then((res) => {
      this.songs = res;
      const albumNames = res.map(
        (item) => `${item.album} by ${item.artists.join(' ')}`
      );
      const setArray = [];
      for (const album of albumNames) {
        const duplicateAlbums = res.filter(
          (response) => response.album === album.slice(0, album.indexOf(' by '))
        );
        if (duplicateAlbums.length > 1) {
          const smallestArtistLength = duplicateAlbums.reduce((prev, curr) =>
            prev.artists.length < curr.artists.length ? prev : curr
          );
          setArray.push(
            `${
              smallestArtistLength.album
            } by ${smallestArtistLength.artists.join(' ')}`
          );
        }
      }
      this.results.setValue([...new Set(setArray)].join('\n'));
      this.resultLoading = false;
    });
  }
}

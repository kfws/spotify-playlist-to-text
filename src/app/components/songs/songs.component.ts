import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Track } from '../../models/track.model';
import { ApiService } from '../../services/api/api.service';
import { RaceService } from '../../services/race/race.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit {
  playlistForm = new FormGroup({
    playlist: new FormControl('', Validators.required),
    playlistResults: new FormControl(''),
  });
  resultLoading = false;
  songs: Track[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly dialog: MatDialog,
    private readonly raceService: RaceService
  ) {}

  ngOnInit(): void {}
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

  get hasSongs(): boolean {
    return (
      (this.results.value as string)?.split('\n').filter(Boolean).length > 0
    );
  }

  get results() {
    return this.playlistForm.controls.playlistResults;
  }

  get playlist(): string {
    return this.playlistForm.controls.playlist.value;
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

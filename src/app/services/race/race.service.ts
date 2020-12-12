import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Track } from '../../models/track.model';
import { Racer } from 'src/app/models/racer.model';

@Injectable({
  providedIn: 'root',
})
export class RaceService implements CanActivate {
  tracks: Track[] = [];
  customTracklist: string[] = [];
  customBackground: any;
  private Winner: Racer = null;
  constructor(private readonly router: Router) {}

  goToRace(tracks: Track[]) {
    if (tracks.length > 1) {
      const shuffledTracks = this.shuffle(tracks);
      this.tracks = shuffledTracks.splice(
        0,
        10 >= tracks.length ? tracks.length : 10
      );
      this.router.navigateByUrl('/race');
    }
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }

  goToCustomResults(tracks: string[], background: any) {
    if (tracks.length) {
      console.log('here');
      this.customTracklist = tracks;
      if (background) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.customBackground = `url("${fileReader.result}")`;
          this.router.navigateByUrl('/custom-results');
        };
        fileReader.readAsDataURL(background);
      } else {
        this.router.navigateByUrl('/custom-results');
      }
    }
  }

  private clone<T>(array: T[]) {
    const copy = [];
    for (const item of array) {
      copy.push(item);
    }
    return copy;
  }

  private shuffle<T>(array: T[]) {
    const copy = this.clone(array);
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  set winner(racer: Racer) {
    this.Winner = racer;
    this.router.navigateByUrl('/results');
  }

  get winner() {
    return this.Winner;
  }

  canActivate() {
    if (
      this.winner ||
      this.tracks.length > 1 ||
      this.customTracklist.length > 1
    ) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Racer } from '../../models/racer.model';
import { RaceService } from '../../services/race/race.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent implements OnInit, OnDestroy {
  racers: Racer[];
  racing = true;

  constructor(private readonly raceService: RaceService) {}

  ngOnInit(): void {
    this.racers = this.raceService.tracks.map((track) => ({
      ...track,
      offset: 0,
    }));
    interval(1)
      .pipe(takeWhile(() => this.racing))
      .subscribe(() => {
        for (const racer of this.racers) {
          if (racer.offset >= window.screen.width - 100) {
            this.racing = false;
            this.raceService.winner = racer;
          } else {
            racer.offset += Math.random();
          }
        }
      });
  }

  getRacer(index: number): string {
    if (index % 3 === 0) {
      return 'assets/sixteenth.png';
    } else if (index % 2 === 0) {
      return 'assets/treble.png';
    }
    return 'assets/eighth.png';
  }

  ngOnDestroy() {
    this.racing = false;
  }
}

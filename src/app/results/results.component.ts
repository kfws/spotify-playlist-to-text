import { Component, OnInit } from '@angular/core';
import { RaceService } from '../services/race/race.service';
import { Racer } from '../models/racer.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  winner: { name: string; artists: string };

  constructor(private readonly raceService: RaceService) {}

  ngOnInit(): void {
    this.winner = {
      name: this.raceService.winner.name,
      artists: this.raceService.winner.artists.join(', '),
    };
  }

  goToHome() {
    this.raceService.goToHome();
  }
}

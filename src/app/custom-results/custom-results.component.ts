import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RaceService } from '../services/race/race.service';

@Component({
  selector: 'app-custom-results',
  templateUrl: './custom-results.component.html',
  styleUrls: ['./custom-results.component.scss'],
})
export class CustomResultsComponent implements OnInit {
  tracks: string[];
  background: string | SafeUrl;

  constructor(
    private readonly raceService: RaceService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.tracks = this.raceService.customTracklist;
    this.background = this.sanitizer.bypassSecurityTrustStyle(
      this.raceService.customBackground
    );
    console.log(this.background);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RaceService } from '../../services/race/race.service';

@Component({
  selector: 'app-custom-ranking',
  templateUrl: './custom-ranking.component.html',
  styleUrls: ['./custom-ranking.component.scss'],
})
export class CustomRankingComponent implements OnInit {
  playlistForm = new FormGroup({
    playlistResults: new FormControl(''),
    customBackground: new FormControl(''),
  });
  constructor(private readonly raceService: RaceService) {}

  ngOnInit(): void {}

  onSearch() {}

  generate() {
    const tracks = this.resultsValue.split('\n').filter(Boolean);
    this.raceService.goToCustomResults(tracks, this.background.value);
  }

  onChange(event) {
    if (event?.target?.files) {
      this.background.setValue(event.target.files[0]);
      console.log(event.target.files);
    }
  }

  get background() {
    return this.playlistForm.controls.customBackground;
  }

  get resultsValue(): string {
    return this.playlistForm.controls.playlistResults.value ?? '';
  }

  get hasSongs(): boolean {
    return this.resultsValue?.split('\n').filter(Boolean).length > 0;
  }
}

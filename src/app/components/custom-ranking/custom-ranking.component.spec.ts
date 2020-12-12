import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRankingComponent } from './custom-ranking.component';

describe('CustomRankingComponent', () => {
  let component: CustomRankingComponent;
  let fixture: ComponentFixture<CustomRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

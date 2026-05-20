import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRecord } from './track-record';

describe('TrackRecord', () => {
  let component: TrackRecord;
  let fixture: ComponentFixture<TrackRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackRecord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

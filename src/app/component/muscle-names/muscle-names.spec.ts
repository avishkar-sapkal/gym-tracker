import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleNames } from './muscle-names';

describe('MuscleNames', () => {
  let component: MuscleNames;
  let fixture: ComponentFixture<MuscleNames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleNames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuscleNames);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

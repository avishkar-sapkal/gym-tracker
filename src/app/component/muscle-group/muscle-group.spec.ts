import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleGroup } from './muscle-group';

describe('MuscleGroup', () => {
  let component: MuscleGroup;
  let fixture: ComponentFixture<MuscleGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuscleGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

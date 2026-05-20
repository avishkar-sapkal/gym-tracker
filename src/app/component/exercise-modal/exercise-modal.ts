import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-exercise-modal',
  standalone: true,
  imports: [DialogModule, TableModule, CommonModule],
  templateUrl: './exercise-modal.html',
  styleUrl: './exercise-modal.css',
})
export class ExerciseModal {

  constructor(private router: Router) { }

  @Input() allExercise: any = []
  @Input() selectedMuscle: string = ''
  @Input() visible!: boolean
  @Input() selectedDate!: Date
  selectedExercise: string = ''


  navigateToProgress(ex: any) {
    this.selectedExercise = ex
    this.router.navigate(['/progress-tracker', this.selectedExercise],{ state: { selectedDate: this.selectedDate } }
    );
  }

}

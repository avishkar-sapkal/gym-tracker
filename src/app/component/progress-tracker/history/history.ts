import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements OnInit {

  @Input() selectedExercise: any
   @Input() selectedDate!: Date;
  show: boolean = false;
  storedData: any = []

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const exerciseKey = `exercise-${this.selectedExercise}`;
    const stored = localStorage.getItem(exerciseKey);
    if (stored) {
      this.storedData = JSON.parse(stored);
    }
  }

  getMaxWeight(records: any[]): number {
    if (!records || records.length === 0) return 0;
    return Math.max(...records.map(r => parseFloat(r.weight) || 0));
  }

  getTotalReps(records: any[]): number {
    if (!records || records.length === 0) return 0;
    return records.reduce((sum, r) => sum + (parseInt(r.reps) || 0), 0);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-track-record',
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule],
  templateUrl: './track-record.html',
  styleUrl: './track-record.css',
})
export class TrackRecord implements OnInit {

  @Input() selectedExercise: string | null = null;
  @Input() selectedDate!: Date;
  allData: any = []
  currentData: any = []
  savedData: any

  rows = [
    { set: 1, weight: 'kg', reps: null }
  ];

  ngOnInit(): void {
    this.getFormattedDate()
  }

  addRow() {
    this.rows.push({
      set: this.rows.length + 1,
      weight: 'kg',
      reps: null
    });
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }

  getFormattedDate(date?: Date): string {
    const d = date ? new Date(date) : new Date();

    const dd = String(d.getDate()).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const mon = months[d.getMonth()];
    const yyyy = d.getFullYear();

    return `${dd}-${mon}-${yyyy}`;
  }

  saveAllRows() {
    const exerciseKey = `exercise-${this.selectedExercise}`
    const highest = this.getHighestSet(this.rows);
    console.log("selectedDate in saveAllRows", this.selectedDate);
    const dateToSave = this.selectedDate ? this.getFormattedDate(this.selectedDate): this.getFormattedDate();

    this.savedData = {
      date: dateToSave,
      selectedExercise: this.selectedExercise,
      highestWeight: highest.weight,
      highestReps: highest.reps,
      records: this.rows
    };
    let previousData = localStorage.getItem(exerciseKey);
    if (previousData) {
      this.allData = JSON.parse(previousData);
    }
    this.allData.push(this.savedData)
    console.log("allData", this.allData);

    localStorage.setItem(exerciseKey, JSON.stringify(this.allData));
  }

  getHighestSet(records: any[]) {
    return records.reduce((max, row) => {
      if (row.weight > max.weight) return row;

      // if weight is same → check reps
      if (row.weight === max.weight && row.reps > max.reps) return row;

      // if both weight & reps are same → take latest
      if (
        row.weight === max.weight &&
        row.reps === max.reps &&
        new Date(row.date) > new Date(max.date)
      ) {
        return row;
      }

      return max;
    });
  }


}


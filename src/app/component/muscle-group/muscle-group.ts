import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ExerciseModal } from '../exercise-modal/exercise-modal';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Header } from '../../pages/Header/header';
import { Footer } from '../../pages/Footer/footer';
import { Router } from '@angular/router';
import { Calendar } from '../calendar/calendar';
import {
  MbscCalendarEvent,
  MbscDateType,
  MbscEventcalendar,
  MbscEventcalendarView,
  MbscEventClickEvent,
  MbscEventCreatedEvent,
  MbscModule,
  MbscPopup,
  MbscPopupButton,
  MbscPopupOptions,
  MbscResponsiveOptions,
  Notifications,
  setOptions,
} from '@mobiscroll/angular';
import { MuscleNames } from '../muscle-names/muscle-names';
import { ProgressTracker } from '../progress-tracker/progress-tracker';



@Component({
  selector: 'app-muscle-group',
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule, DialogModule, TableModule, DatePickerModule, Header, Footer, MbscModule,MuscleNames,Calendar],
  templateUrl: './muscle-group.html',
  styleUrls: ['./muscle-group.css'],
})
export class MuscleGroup {

  constructor(private router: Router, private notify: Notifications) { }

  title = 'GYM TRACKER'
  startedDate = '16/June/2025'
  selectedMuscle: string = ''
  visible: boolean = false;
  weight = '75'
  height = "5'7"
  age = '22'
  selectedDate!: Date
  editProfileVisible: boolean = false
  formattedDate:string=''
  

  exercise = {
    back: ["Pull-Ups", "Lat-Pulldown", "Seated-Cable-Row", "Single-Arm-Cable-Row", "Straight-Arm-Pulldown", "Bent-Over-Barbell-Row", "Close-Arm-Pulldown", "Deadlift", "Back-Extensions", "Chin-Ups"],
    chest: ["Push-Ups", "Chest-Dips", "Incline-Dumbbell-Press", "Flat-Dumbbell-Press", "High-Low-Cable-Fly", "Pec-Deck-Machine", "Low-High-Cable-Fly", "Bench-Press", "Incline-Barbell-Press", "Decline-Dumbbell-Press"],
    bicep: ["Dumbbell-Curl", "Incline-Dumbbell-Curl", "Hammer-Curl", "Preacher-Curl", "Cable-Curl", "EZ-Bar-Curl", "Reverse-Curl", "Concentration-Curl"],
    tricep: ["Bar-Pushdown", "Rope-Pushdown", "Overhead-V-Handle-Extension", "One-Arm-Overhead-Extension", "Rope-Overhead-Extension", "Reverse-Grip-Tricep-Pushdown", "Close-Grip-Bench-Press", "Skull-Crushers", "Dips", "Kickbacks", "Diamond-Push-Ups"],
    shoulder: ["Overhead-Dumbbell-Press", "Lateral-Raise", "Front-Raise", "Shrugs", "Face-Pull", "Cabel-Upright-Row", "Cable-Lateral-Raise"],
    legs: ["Romanian-Deadlift", "DB-Sumo-Squat", "Squats", "Leg-Press", "Lunges", "Leg-Extension", "Leg-Curl", "Calf-Raises"],
    abs: ["Crunches", "Sit-Ups", "Leg-Raises", "Hanging-Knee-Raises", "Plank", "Side-Plank", "Bicycle-Crunches", "Russian-Twists", "Mountain-Climbers", "Flutter-Kicks"],
  };

  allMuscles = Object.keys(this.exercise);
  allExercise: any = this.exercise;

  showDialog(muscle: any) {
    this.visible = true
    this.selectedMuscle = muscle
  }

  selectMuscle(muscle: string) {
    this.selectedMuscle = muscle;
  }

  navigateToProgress(exercise: string) {
    this.router.navigate(['/progress-tracker', exercise], { state: { selectedDate: this.selectedDate } });
  }

  // dateByHistory() {
  //   const months = [
  //     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  //   ];
  //   const mon = months[this.selectedDate.getMonth()];
  //   const dd = String(this.selectedDate.getDate()).padStart(2, '0');
  //   const yyyy = this.selectedDate.getFullYear();
  //   const formattedDate = `${dd}/${mon}/${yyyy}`;
  //   const date = formattedDate.toString().split('T')[0];
  //   console.log(date);

  //   this.router.navigate(['/history', date]);

  // }
  openEditProfile() {
    this.editProfileVisible = true;
  }
  saveProfile() {
    console.log('Saved:', this.weight, this.height, this.age);
    this.editProfileVisible = false;
  }

  

}

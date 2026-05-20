import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ExerciseModal } from '../exercise-modal/exercise-modal';

@Component({
  selector: 'app-muscle-names',
  imports: [ButtonModule, FormsModule, CommonModule, DialogModule,ExerciseModal],
  templateUrl: './muscle-names.html',
  styleUrl: './muscle-names.css',
})
export class MuscleNames {

  selectedMuscle: string = ''
  @Input() selectedDate! : Date
  visible: boolean = false;

  exercise = {
    back: ["Pull-Ups", "Lat-Pulldown", "Seated-Cable-Row", "Single-Arm-Cable-Row", "Straight-Arm-Pulldown", "Bent-Over-Barbell-Row", "Close-Arm-Pulldown", "Deadlift", "Back-Extensions", "Chin-Ups",],
    chest: ["Push-Ups", "Chest-Dips", "Incline-Dumbbell-Press", "Flat-Dumbbell-Press", "High-Low-Cable-Fly", "Pec-Deck-Machine", "Low-High-Cable-Fly", "Bench-Press", "Incline-Barbell-Press", "Decline-Dumbbell-Press"],
    bicep: ["Dumbbell-Curl", "Incline-Dumbbell-Curl", "Hammer-Curl", "Preacher-Curl", "Cable-Curl", "EZ-Bar-Curl", "Reverse-Curl", "Concentration-Curl"],
    tricep: ["Bar-Pushdown", "Rope-Pushdown", "Overhead-V-Handle-Extension", "One-Arm-Overhead-Extension", "Rope-Overhead-Extension", "Reverse-Grip-Tricep-Pushdown", "Close-Grip-Bench-Press", "Skull-Crushers", "Dips", "Kickbacks", "Diamond-Push-Ups"],
    shoulder: ["Overhead-Dumbbell-Press", "Lateral-Raise", "Front-Raise", "Shrugs", "Face-Pull", "Cabel-Upright-Row", "Cable-Lateral-Raise"],
    legs: ["Romanian-Deadlift", "DB-Sumo-Squat", "Squats", "Leg-Press", "Lunges", "Leg-Extension", "Leg-Curl", "Calf-Raises"],
    abs: ["Crunches", "Sit-Ups", "Leg-Raises", "Hanging-Knee-Raises", "Plank", "Side-Plank", "Bicycle-Crunches", "Russian-Twists", "Mountain-Climbers", "Flutter-Kicks"],
  };

  showDialog(muscle: any) {
    this.visible = true
    this.selectedMuscle = muscle    
  }

}

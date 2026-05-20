import { Routes } from '@angular/router';
import { MuscleGroup } from './component/muscle-group/muscle-group';
import { ProgressTracker } from './component/progress-tracker/progress-tracker';
import { History } from './pages/History/history';

export const routes: Routes = [
    {path:'', component:MuscleGroup},
    {path:'progress-tracker/:selectedExercise',component:ProgressTracker},
    {path:'history/:date',component:History}
];

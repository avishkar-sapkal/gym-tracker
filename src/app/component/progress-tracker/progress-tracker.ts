import { Component, Input,OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ExerciseModal } from '../exercise-modal/exercise-modal';
import { ActivatedRoute, Route } from '@angular/router';
import { TrackRecord } from './track-record/track-record';
import { History } from './history/history';
import { Graph } from './graph/graph';
import { CommonModule } from '@angular/common';
import { Header } from '../../pages/Header/header';
import { Footer } from '../../pages/Footer/footer';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [TabsModule, TrackRecord, History, Graph, CommonModule, Header, Footer],
  templateUrl: './progress-tracker.html',
  styleUrl: './progress-tracker.css',
})
export class ProgressTracker implements OnInit{

  constructor(private route: ActivatedRoute) { }

  selectedExercise: string | null = null
  selectedDate!:Date
  activeTab: number = 0;
  
  
  ngOnInit() {
    const selectedExercise = this.route.snapshot.paramMap.get('selectedExercise');
    this.selectedExercise = selectedExercise
    this.selectedDate = history.state.selectedDate;    
    
  }

  setActiveTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../pages/Header/header';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Footer } from '../../pages/Footer/footer';
import { MuscleNames } from '../../component/muscle-names/muscle-names';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, Header, Footer,DialogModule,ButtonModule,MuscleNames],
  templateUrl: './history.html',
})
export class History implements OnInit {

  selectedDate!: string;
  historyData: any[] = [];
  displayDialog: boolean = false
  showMuscleGroup: boolean = false

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.selectedDate = this.route.snapshot.paramMap.get('date')!;    
    this.loadHistory();
  }

  get selectedDateObj(): Date {
    const [dd, mon, yyyy] = this.selectedDate.split('-');

    const months: any = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    return new Date(+yyyy, months[mon], +dd);
  }

  get today(): Date {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }

  loadHistory() {
    if (this.selectedDateObj > this.today) {
      this.historyData = [];
      return;
    }
    

    this.historyData = [];
    for (let i = 0; i < localStorage.length; i++) {


      const key = localStorage.key(i);

      if (key && key.startsWith('exercise-')) {
        const exerciseName = key.replace('exercise-', '');

        const storedData = JSON.parse(localStorage.getItem(key) || '[]');

        const filtered = storedData.filter(
          (item: any) => item.date === this.selectedDate
        );

        if (filtered.length > 0) {
          this.historyData.push({
            exercise: exerciseName,
            records: filtered[0].records,
            show: false
          });
        }
      }
    }
  }

  addData() {
    // console.log("addData is clicked",this.selectedDate);
    this.displayDialog = true
  }
}

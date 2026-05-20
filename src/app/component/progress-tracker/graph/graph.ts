import { Component, Input, ViewChild, ElementRef, OnInit, } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-graph',
  imports: [ChartModule, CommonModule],
  templateUrl: './graph.html',
  styleUrls: ['./graph.css']
})
export class Graph implements OnInit {

  @Input() selectedExercise: string | null = null;
  @Input() storedData: any = []
  @Input() selectedDate!: Date;
  chartData: any;
  chartOptions: any;


  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const exerciseKey = `exercise-${this.selectedExercise}`;
    const stored = localStorage.getItem(exerciseKey);
    if (stored) {
      this.storedData = JSON.parse(stored);
    }
    this.createChart()
  }

  createChart() {
    const labels = this.storedData.map((date: any) => {
      let dat = date.date
      return dat
    })

    const highestWeightData = this.storedData.map((maxWeight: any) => {
      let maxW: Number = parseInt(maxWeight.highestWeight)
      console.log(typeof maxW);
      return maxW
    })

    const highestRepsData = this.storedData.map((maxRep: any) => {
      let maxR = maxRep.highestReps
      console.log(maxR);
      return maxR

    })
    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Highest Weight (kg)',
          data: highestWeightData,
          backgroundColor: 'rgba(187, 222, 251, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
      ]
    };
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Exercise Progress'
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const index = context.dataIndex;

              const weight = context.chart.data.datasets[0].data[index];
              const reps = this.storedData[index].highestReps;

              return `Weight: ${weight} kg | Reps: ${reps}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5
          }
        }
      }
    };

  }

}

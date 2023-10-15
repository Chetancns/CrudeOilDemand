import { Component, OnInit } from '@angular/core';
import {ApiService } from '../../Service/api.service'
import {ChartDataset, ChartOptions,ChartType } from 'chart.js'
import {NgChartsModule } from 'ng2-charts'

@Component({
  selector: 'app-loss-chart',
  templateUrl: './loss-chart.component.html',
  styleUrls: ['./loss-chart.component.css']
})
export class LossChartComponent implements OnInit {
  jsonData: any | undefined;
  dataArray: any[] = [];
  lineChartData: ChartDataset[] = [];
  lineChartLabels: any[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true, plugins: {
      legend: {
        labels: {
          font: {
            size: 14
          }
        },
        display: true, // Ensure that the legend is displayed
        position: 'top', // Change legend position as needed
        onHover: (event, legendItem, legend) => {
          // Add hover animation logic if required
          legendItem.hidden = false; // Show the legend item
        },
        onLeave: (event, legendItem, legend) => {
          // Add leave animation logic if required
          legendItem.hidden = true; // Hide the legend item
        }
      }
    }
};
  lineChartLegend = true;
  chartType: ChartType = 'line';
  data: any | undefined;

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.getLossData().subscribe((data: any) => {
      console.log(data.data)
      this.jsonData = data.data;
      this.dataArray = JSON.parse(this.jsonData);
      this.createLossChart();
    })
  }

  createLossChart() {
    this.data = {
      labels: this.dataArray.map(item => item.Iteration),
      datasets: [
        {
          label: 'Training Loss',
          data: this.dataArray.map(item => item.training_loss),
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
        {
          label: 'Test Loss',
          data: this.dataArray.map(item => item.test_loss),
          borderColor: 'rgba(255,99,132,1)',
          fill: false,
        },
      ],
    };
  }
}

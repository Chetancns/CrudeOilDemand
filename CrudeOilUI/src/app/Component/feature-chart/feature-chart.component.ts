import { Component, OnInit } from '@angular/core';
import {ApiService } from '../../Service/api.service'
import {ChartDataset,ChartOptions,ChartType } from 'chart.js'
import { NgChartsModule } from 'ng2-charts'

@Component({
  selector: 'app-feature-chart',
  templateUrl: './feature-chart.component.html',
  styleUrls: ['./feature-chart.component.css']
})
export class FeatureChartComponent implements OnInit {
  jsonData: any | undefined;
  dataArray: any[] = [];
  countries: string[] = [];
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
  chartType: ChartType = 'bar';
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.getFeatureData().subscribe((data: any) => {
      this.jsonData = data.data;
      this.dataArray = JSON.parse(this.jsonData);
      this.createBarChart();
    });
  }
  createBarChart() {
    this.lineChartData = [{
      data: this.dataArray.map(item => item.feature_importance),
      label: 'Feature Importance',
      backgroundColor: 'rgba(75,192,192,1)'
    }];
    this.lineChartLabels = this.dataArray.map(item => item.feature_names);
    this.lineChartLegend = false;
  }
}

import { Component, OnInit } from '@angular/core'
import {ApiService } from '../../Service/api.service'
import { ChartDataset, ChartOptions,ChartType } from 'chart.js';
import {NgChartsModule } from 'ng2-charts'

@Component({
  selector: 'app-world-chart',
  templateUrl: './world-chart.component.html',
  styleUrls: ['./world-chart.component.css']
})
export class WorldChartComponent implements OnInit {

  jsonData: any |undefined;
  dataArray: any[] = [];
  countries: string[] = [];
    lineChartData: ChartDataset[]=[];
    lineChartLabels: any[]=[];
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
  chartType:ChartType= 'line';
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.getWorldData().subscribe((data: any) => {
      console.log(data.data)
      this.jsonData = data.data;
      this.dataArray = JSON.parse(this.jsonData);
      this.dataArray.sort((a,b) => a.Year - b.Year)
      this.countries = [...new Set(this.dataArray.map(item => item.Country))]
      this.createLineChart();
    })
  }

  createLineChart() {
    const chartData: any[] = [];

    this.countries.forEach(Country => {
      const countrydata = this.dataArray.filter(item => item.Country === Country);
      
      const dataset = {
        label: Country,
        data: countrydata.map(item => item.Demand),
        borderColor: this.getRandomColor(),
        fill: false
      };
      chartData.push(dataset);
    });
    const years = [...new Set(this.dataArray.map(item => item.Year))];
    this.lineChartData = chartData;
    this.lineChartLabels = years;
    this.lineChartOptions = { responsive: true, };
    this.lineChartLegend = true;
    this.chartType = 'line';
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}

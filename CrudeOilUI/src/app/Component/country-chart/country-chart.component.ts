import { Component } from '@angular/core';
import { ApiService } from '../../Service/api.service'
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'

@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.css']
})
export class CountryChartComponent {
  Names: any;
  Value: string = "";
  jsonData: any | undefined;
  dataArray: any[] = [];
  countries: string[] = [];
  lineChartData: ChartDataset[] = [];
  lineChartLabels: any[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartLegend = true;
  chartType: ChartType = 'line';
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.getCountryNames().subscribe((data: any) => {
      console.log(data);
      this.Names = data;
      this.Value = this.Names[0];
      this.Testing(this.Value)
      this.ChartContryData(this.Value);
    });
  }

  onDropdownChange(event: any) {
    this.Testing(this.Value);
    this.ChartContryData(this.Value);
    //this.ChartContryData(this.Value);

  }

  Testing(Name: string) {
    console.log(Name + "hello");
  }

  ChartContryData(Name: string) {
    console.log(Name + "where");
    this.apiService.getCountryData(Name).subscribe((data: any) => {
      this.jsonData = data.data;
      console.log(this.jsonData);
      this.dataArray = JSON.parse(this.jsonData);
      this.dataArray.sort((a, b) => a.Year - b.Year)
      this.countries = [...new Set(this.dataArray.map(item => item.Country))]
      this.CountryGraph();
    });
    

  }
  CountryGraph() {
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
    this.lineChartLegend = false;
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

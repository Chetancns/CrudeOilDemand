import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgChartsModule } from 'ng2-charts'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { WorldChartComponent } from './Component/world-chart/world-chart.component';
import { CountryChartComponent } from './Component/country-chart/country-chart.component';
import { LossChartComponent } from './Component/loss-chart/loss-chart.component';
import { FeatureChartComponent } from './Component/feature-chart/feature-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldChartComponent,
    CountryChartComponent,
    LossChartComponent,
    FeatureChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

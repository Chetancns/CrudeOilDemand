import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryChartComponent } from './country-chart.component';

describe('CountryChartComponent', () => {
  let component: CountryChartComponent;
  let fixture: ComponentFixture<CountryChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryChartComponent]
    });
    fixture = TestBed.createComponent(CountryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

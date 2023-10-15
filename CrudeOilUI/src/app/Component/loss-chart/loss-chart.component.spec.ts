import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossChartComponent } from './loss-chart.component';

describe('LossChartComponent', () => {
  let component: LossChartComponent;
  let fixture: ComponentFixture<LossChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LossChartComponent]
    });
    fixture = TestBed.createComponent(LossChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

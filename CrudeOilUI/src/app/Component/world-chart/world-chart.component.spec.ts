import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldChartComponent } from './world-chart.component';

describe('WorldChartComponent', () => {
  let component: WorldChartComponent;
  let fixture: ComponentFixture<WorldChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorldChartComponent]
    });
    fixture = TestBed.createComponent(WorldChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

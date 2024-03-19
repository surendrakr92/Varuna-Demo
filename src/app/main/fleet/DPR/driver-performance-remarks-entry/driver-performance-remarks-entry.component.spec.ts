import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPerformanceRemarksEntryComponent } from './driver-performance-remarks-entry.component';

describe('DriverPerformanceRemarksEntryComponent', () => {
  let component: DriverPerformanceRemarksEntryComponent;
  let fixture: ComponentFixture<DriverPerformanceRemarksEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverPerformanceRemarksEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverPerformanceRemarksEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

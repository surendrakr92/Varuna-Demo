import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPerformanceRemarksCreateComponent } from './driver-performance-remarks-create.component';

describe('DriverPerformanceRemarksCreateComponent', () => {
  let component: DriverPerformanceRemarksCreateComponent;
  let fixture: ComponentFixture<DriverPerformanceRemarksCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverPerformanceRemarksCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverPerformanceRemarksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

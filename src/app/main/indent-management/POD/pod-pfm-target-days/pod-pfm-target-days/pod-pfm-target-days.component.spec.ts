import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PODPFMTargetDaysComponent } from './pod-pfm-target-days.component';

describe('PODPFMTargetDaysComponent', () => {
  let component: PODPFMTargetDaysComponent;
  let fixture: ComponentFixture<PODPFMTargetDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PODPFMTargetDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PODPFMTargetDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

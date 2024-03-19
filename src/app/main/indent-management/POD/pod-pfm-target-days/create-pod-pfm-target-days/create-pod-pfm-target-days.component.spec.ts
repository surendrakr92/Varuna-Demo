import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePODPFMTargetDaysComponent } from './create-pod-pfm-target-days.component';

describe('CreatePODPFMTargetDaysComponent', () => {
  let component: CreatePODPFMTargetDaysComponent;
  let fixture: ComponentFixture<CreatePODPFMTargetDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePODPFMTargetDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePODPFMTargetDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

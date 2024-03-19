import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationOfPODSupervisorAgainstCustomerComponent } from './allocation-of-pod-supervisor-against-customer.component';

describe('AllocationOfPODSupervisorAgainstCustomerComponent', () => {
  let component: AllocationOfPODSupervisorAgainstCustomerComponent;
  let fixture: ComponentFixture<AllocationOfPODSupervisorAgainstCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationOfPODSupervisorAgainstCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationOfPODSupervisorAgainstCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssignmentToPRQComponent } from './vehicle-assignment-to-prq.component';

describe('VehicleAssignmentToPRQComponent', () => {
  let component: VehicleAssignmentToPRQComponent;
  let fixture: ComponentFixture<VehicleAssignmentToPRQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAssignmentToPRQComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleAssignmentToPRQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

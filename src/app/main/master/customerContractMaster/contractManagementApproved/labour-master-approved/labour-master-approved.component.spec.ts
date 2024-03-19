import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourMasterApprovedComponent } from './labour-master-approved.component';

describe('LabourMasterApprovedComponent', () => {
  let component: LabourMasterApprovedComponent;
  let fixture: ComponentFixture<LabourMasterApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourMasterApprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabourMasterApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

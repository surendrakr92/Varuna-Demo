import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMasterListComponent } from './vehicle-master-list.component';

describe('VehicleMasterListComponent', () => {
  let component: VehicleMasterListComponent;
  let fixture: ComponentFixture<VehicleMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

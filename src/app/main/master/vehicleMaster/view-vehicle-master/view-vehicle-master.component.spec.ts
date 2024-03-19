import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVehicleMasterComponent } from './view-vehicle-master.component';

describe('ViewVehicleMasterComponent', () => {
  let component: ViewVehicleMasterComponent;
  let fixture: ComponentFixture<ViewVehicleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVehicleMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVehicleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

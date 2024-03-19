import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvNonVehicleComponent } from './mv-non-vehicle.component';

describe('MvNonVehicleComponent', () => {
  let component: MvNonVehicleComponent;
  let fixture: ComponentFixture<MvNonVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvNonVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MvNonVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

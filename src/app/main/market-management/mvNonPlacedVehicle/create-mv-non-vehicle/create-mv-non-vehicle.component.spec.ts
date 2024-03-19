import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMvNonVehicleComponent } from './create-mv-non-vehicle.component';

describe('CreateMvNonVehicleComponent', () => {
  let component: CreateMvNonVehicleComponent;
  let fixture: ComponentFixture<CreateMvNonVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMvNonVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMvNonVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

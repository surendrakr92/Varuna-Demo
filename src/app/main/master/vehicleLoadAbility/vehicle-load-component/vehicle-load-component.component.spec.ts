import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLoadComponentComponent } from './vehicle-load-component.component';

describe('VehicleLoadComponentComponent', () => {
  let component: VehicleLoadComponentComponent;
  let fixture: ComponentFixture<VehicleLoadComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleLoadComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleLoadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

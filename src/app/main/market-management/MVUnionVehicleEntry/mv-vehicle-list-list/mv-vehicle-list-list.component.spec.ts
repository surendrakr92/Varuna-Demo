import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvVehicleListListComponent } from './mv-vehicle-list-list.component';

describe('MvVehicleListListComponent', () => {
  let component: MvVehicleListListComponent;
  let fixture: ComponentFixture<MvVehicleListListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvVehicleListListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MvVehicleListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

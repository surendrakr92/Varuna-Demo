import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvAvailabilityListComponent } from './mv-availability-list.component';

describe('MvAvailabilityListComponent', () => {
  let component: MvAvailabilityListComponent;
  let fixture: ComponentFixture<MvAvailabilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvAvailabilityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MvAvailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

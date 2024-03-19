import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvAvailabilityComponent } from './mv-availability.component';

describe('MvAvailabilityComponent', () => {
  let component: MvAvailabilityComponent;
  let fixture: ComponentFixture<MvAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MvAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

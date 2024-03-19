import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOpenComponent } from './trip-open.component';

describe('TripOpenComponent', () => {
  let component: TripOpenComponent;
  let fixture: ComponentFixture<TripOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

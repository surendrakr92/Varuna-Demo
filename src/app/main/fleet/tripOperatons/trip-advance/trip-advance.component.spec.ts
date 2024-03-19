import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAdvanceComponent } from './trip-advance.component';

describe('TripAdvanceComponent', () => {
  let component: TripAdvanceComponent;
  let fixture: ComponentFixture<TripAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripAdvanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

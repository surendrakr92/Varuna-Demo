import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOpenDetailsComponent } from './trip-open-details.component';

describe('TripOpenDetailsComponent', () => {
  let component: TripOpenDetailsComponent;
  let fixture: ComponentFixture<TripOpenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripOpenDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripOpenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

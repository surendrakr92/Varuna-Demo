import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArrivalDateTimeComponent } from './update-arrival-date-time.component';

describe('UpdateArrivalDateTimeComponent', () => {
  let component: UpdateArrivalDateTimeComponent;
  let fixture: ComponentFixture<UpdateArrivalDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateArrivalDateTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateArrivalDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

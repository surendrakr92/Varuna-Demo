import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketLandingComponent } from './ticket-landing.component';

describe('TicketLandingComponent', () => {
  let component: TicketLandingComponent;
  let fixture: ComponentFixture<TicketLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

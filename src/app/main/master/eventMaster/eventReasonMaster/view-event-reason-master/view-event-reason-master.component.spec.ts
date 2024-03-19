import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventReasonMasterComponent } from './view-event-reason-master.component';

describe('ViewEventReasonMasterComponent', () => {
  let component: ViewEventReasonMasterComponent;
  let fixture: ComponentFixture<ViewEventReasonMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventReasonMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventReasonMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReasonMasterListComponent } from './event-reason-master-list.component';

describe('EventReasonMasterListComponent', () => {
  let component: EventReasonMasterListComponent;
  let fixture: ComponentFixture<EventReasonMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventReasonMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventReasonMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

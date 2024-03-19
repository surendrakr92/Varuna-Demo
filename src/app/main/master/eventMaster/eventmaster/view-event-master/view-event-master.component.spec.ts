import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventMasterComponent } from './view-event-master.component';

describe('ViewEventMasterComponent', () => {
  let component: ViewEventMasterComponent;
  let fixture: ComponentFixture<ViewEventMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventMasterComponent } from './create-event-master.component';

describe('CreateEventMasterComponent', () => {
  let component: CreateEventMasterComponent;
  let fixture: ComponentFixture<CreateEventMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

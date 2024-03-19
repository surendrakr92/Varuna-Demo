import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainAndSubEventMasterComponent } from './create-main-and-sub-event-master.component';

describe('CreateMainAndSubEventMasterComponent', () => {
  let component: CreateMainAndSubEventMasterComponent;
  let fixture: ComponentFixture<CreateMainAndSubEventMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMainAndSubEventMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMainAndSubEventMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

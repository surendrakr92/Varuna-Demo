import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLanePriorityComponent } from './update-lane-priority.component';

describe('UpdateLanePriorityComponent', () => {
  let component: UpdateLanePriorityComponent;
  let fixture: ComponentFixture<UpdateLanePriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLanePriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLanePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

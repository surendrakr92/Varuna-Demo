import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanePriorityListComponent } from './lane-priority-list.component';

describe('LanePriorityListComponent', () => {
  let component: LanePriorityListComponent;
  let fixture: ComponentFixture<LanePriorityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanePriorityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanePriorityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

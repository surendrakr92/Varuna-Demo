import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLanePriorityListComponent } from './view-lane-priority-list.component';

describe('ViewLanePriorityListComponent', () => {
  let component: ViewLanePriorityListComponent;
  let fixture: ComponentFixture<ViewLanePriorityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLanePriorityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLanePriorityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

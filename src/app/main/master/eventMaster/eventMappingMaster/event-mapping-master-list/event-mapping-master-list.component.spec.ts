import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMappingMasterListComponent } from './event-mapping-master-list.component';

describe('EventMappingMasterListComponent', () => {
  let component: EventMappingMasterListComponent;
  let fixture: ComponentFixture<EventMappingMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMappingMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMappingMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

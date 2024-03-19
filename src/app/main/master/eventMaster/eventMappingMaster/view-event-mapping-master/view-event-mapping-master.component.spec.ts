import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventMappingMasterComponent } from './view-event-mapping-master.component';

describe('ViewEventMappingMasterComponent', () => {
  let component: ViewEventMappingMasterComponent;
  let fixture: ComponentFixture<ViewEventMappingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventMappingMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventMappingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

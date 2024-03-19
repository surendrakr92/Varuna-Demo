import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAndSubEventMasterListComponent } from './main-and-sub-event-master-list.component';

describe('MainAndSubEventMasterListComponent', () => {
  let component: MainAndSubEventMasterListComponent;
  let fixture: ComponentFixture<MainAndSubEventMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAndSubEventMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAndSubEventMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMasterViewComponent } from './group-master-view.component';

describe('GroupMasterViewComponent', () => {
  let component: GroupMasterViewComponent;
  let fixture: ComponentFixture<GroupMasterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMasterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

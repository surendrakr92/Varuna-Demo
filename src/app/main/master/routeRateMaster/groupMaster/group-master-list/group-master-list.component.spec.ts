import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMasterListComponent } from './group-master-list.component';

describe('GroupMasterListComponent', () => {
  let component: GroupMasterListComponent;
  let fixture: ComponentFixture<GroupMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

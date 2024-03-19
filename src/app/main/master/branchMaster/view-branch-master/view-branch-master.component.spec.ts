import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBranchMasterComponent } from './view-branch-master.component';

describe('ViewBranchMasterComponent', () => {
  let component: ViewBranchMasterComponent;
  let fixture: ComponentFixture<ViewBranchMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBranchMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBranchMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

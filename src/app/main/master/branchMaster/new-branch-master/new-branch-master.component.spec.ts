import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBranchMasterComponent } from './new-branch-master.component';

describe('NewBranchMasterComponent', () => {
  let component: NewBranchMasterComponent;
  let fixture: ComponentFixture<NewBranchMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBranchMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBranchMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

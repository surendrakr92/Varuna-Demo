import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBranchMappingComponent } from './user-branch-mapping.component';

describe('UserBranchMappingComponent', () => {
  let component: UserBranchMappingComponent;
  let fixture: ComponentFixture<UserBranchMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBranchMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBranchMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

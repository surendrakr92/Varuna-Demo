import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBranchUserMappingComponent } from './new-branch-user-mapping.component';

describe('NewBranchUserMappingComponent', () => {
  let component: NewBranchUserMappingComponent;
  let fixture: ComponentFixture<NewBranchUserMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBranchUserMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBranchUserMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

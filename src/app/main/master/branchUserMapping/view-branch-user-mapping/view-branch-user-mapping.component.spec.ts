import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBranchUserMappingComponent } from './view-branch-user-mapping.component';

describe('ViewBranchUserMappingComponent', () => {
  let component: ViewBranchUserMappingComponent;
  let fixture: ComponentFixture<ViewBranchUserMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBranchUserMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBranchUserMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

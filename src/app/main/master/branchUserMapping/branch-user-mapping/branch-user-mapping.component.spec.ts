import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchUserMappingComponent } from './branch-user-mapping.component';

describe('BranchUserMappingComponent', () => {
  let component: BranchUserMappingComponent;
  let fixture: ComponentFixture<BranchUserMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchUserMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchUserMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

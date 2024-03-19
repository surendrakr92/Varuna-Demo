import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoleUserMappingComponent } from './view-role-user-mapping.component';

describe('ViewRoleUserMappingComponent', () => {
  let component: ViewRoleUserMappingComponent;
  let fixture: ComponentFixture<ViewRoleUserMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRoleUserMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoleUserMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

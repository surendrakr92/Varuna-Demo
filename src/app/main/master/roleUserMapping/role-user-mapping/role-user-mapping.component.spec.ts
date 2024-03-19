import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUserMappingComponent } from './role-user-mapping.component';

describe('RoleUserMappingComponent', () => {
  let component: RoleUserMappingComponent;
  let fixture: ComponentFixture<RoleUserMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleUserMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleUserMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

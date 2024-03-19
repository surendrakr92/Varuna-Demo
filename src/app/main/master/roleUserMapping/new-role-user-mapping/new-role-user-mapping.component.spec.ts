import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoleUserMappingComponent } from './new-role-user-mapping.component';

describe('NewRoleUserMappingComponent', () => {
  let component: NewRoleUserMappingComponent;
  let fixture: ComponentFixture<NewRoleUserMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRoleUserMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRoleUserMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

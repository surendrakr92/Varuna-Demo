import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentMasterComponent } from './create-department-master.component';

describe('CreateDepartmentMasterComponent', () => {
  let component: CreateDepartmentMasterComponent;
  let fixture: ComponentFixture<CreateDepartmentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDepartmentMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDepartmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

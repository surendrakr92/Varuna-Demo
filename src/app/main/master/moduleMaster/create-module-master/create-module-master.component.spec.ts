import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModuleMasterComponent } from './create-module-master.component';

describe('CreateModuleMasterComponent', () => {
  let component: CreateModuleMasterComponent;
  let fixture: ComponentFixture<CreateModuleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateModuleMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModuleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

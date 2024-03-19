import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserMasterComponent } from './new-user-master.component';

describe('NewUserMasterComponent', () => {
  let component: NewUserMasterComponent;
  let fixture: ComponentFixture<NewUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

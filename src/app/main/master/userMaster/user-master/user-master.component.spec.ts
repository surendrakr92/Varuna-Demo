import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterComponent } from './user-master.component';

describe('UserMasterComponent', () => {
  let component: UserMasterComponent;
  let fixture: ComponentFixture<UserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

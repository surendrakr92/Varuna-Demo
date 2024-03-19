import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOwnerMasterComponent } from './new-owner-master.component';

describe('NewOwnerMasterComponent', () => {
  let component: NewOwnerMasterComponent;
  let fixture: ComponentFixture<NewOwnerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOwnerMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOwnerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

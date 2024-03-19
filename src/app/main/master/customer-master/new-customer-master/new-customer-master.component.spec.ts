import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerMasterComponent } from './new-customer-master.component';

describe('NewCustomerMasterComponent', () => {
  let component: NewCustomerMasterComponent;
  let fixture: ComponentFixture<NewCustomerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustomerMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

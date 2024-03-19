import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowELRCustomerAddressMasterComponent } from './allow-elr-customer-address-master.component';

describe('AllowELRCustomerAddressMasterComponent', () => {
  let component: AllowELRCustomerAddressMasterComponent;
  let fixture: ComponentFixture<AllowELRCustomerAddressMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowELRCustomerAddressMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowELRCustomerAddressMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

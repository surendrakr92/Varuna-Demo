import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerContractMasterComponent } from './create-customer-contract-master.component';

describe('CreateCustomerContractMasterComponent', () => {
  let component: CreateCustomerContractMasterComponent;
  let fixture: ComponentFixture<CreateCustomerContractMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomerContractMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomerContractMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

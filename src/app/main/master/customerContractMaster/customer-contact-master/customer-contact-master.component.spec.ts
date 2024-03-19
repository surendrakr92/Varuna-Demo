import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactMasterComponent } from './customer-contact-master.component';

describe('CustomerContactMasterComponent', () => {
  let component: CustomerContactMasterComponent;
  let fixture: ComponentFixture<CustomerContactMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContactMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContactMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

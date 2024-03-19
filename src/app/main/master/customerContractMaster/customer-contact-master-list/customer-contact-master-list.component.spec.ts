import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactMasterListComponent } from './customer-contact-master-list.component';

describe('CustomerContactMasterListComponent', () => {
  let component: CustomerContactMasterListComponent;
  let fixture: ComponentFixture<CustomerContactMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContactMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContactMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

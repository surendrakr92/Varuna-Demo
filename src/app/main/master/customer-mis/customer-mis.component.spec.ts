import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMisComponent } from './customer-mis.component';

describe('CustomerMisComponent', () => {
  let component: CustomerMisComponent;
  let fixture: ComponentFixture<CustomerMisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

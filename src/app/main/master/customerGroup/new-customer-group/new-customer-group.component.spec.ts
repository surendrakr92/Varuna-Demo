import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerGroupComponent } from './new-customer-group.component';

describe('NewCustomerGroupComponent', () => {
  let component: NewCustomerGroupComponent;
  let fixture: ComponentFixture<NewCustomerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustomerGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

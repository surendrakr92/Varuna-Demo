import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerMasterComponent } from './view-customer-master.component';

describe('ViewCustomerMasterComponent', () => {
  let component: ViewCustomerMasterComponent;
  let fixture: ComponentFixture<ViewCustomerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomerMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

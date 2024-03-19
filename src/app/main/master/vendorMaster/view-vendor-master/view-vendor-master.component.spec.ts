import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorMasterComponent } from './view-vendor-master.component';

describe('ViewVendorMasterComponent', () => {
  let component: ViewVendorMasterComponent;
  let fixture: ComponentFixture<ViewVendorMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVendorMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVendorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

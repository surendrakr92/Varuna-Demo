import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyMasterComponent } from './view-company-master.component';

describe('ViewCompanyMasterComponent', () => {
  let component: ViewCompanyMasterComponent;
  let fixture: ComponentFixture<ViewCompanyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompanyMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCompanyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

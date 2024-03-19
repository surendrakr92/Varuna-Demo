import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinancialYearComponent } from './view-financial-year.component';

describe('ViewFinancialYearComponent', () => {
  let component: ViewFinancialYearComponent;
  let fixture: ComponentFixture<ViewFinancialYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFinancialYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFinancialYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

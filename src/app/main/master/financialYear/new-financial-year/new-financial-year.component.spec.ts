import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinancialYearComponent } from './new-financial-year.component';

describe('NewFinancialYearComponent', () => {
  let component: NewFinancialYearComponent;
  let fixture: ComponentFixture<NewFinancialYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFinancialYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFinancialYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

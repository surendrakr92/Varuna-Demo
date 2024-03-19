import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFinYearComponent } from './change-fin-year.component';

describe('ChangeFinYearComponent', () => {
  let component: ChangeFinYearComponent;
  let fixture: ComponentFixture<ChangeFinYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeFinYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeFinYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

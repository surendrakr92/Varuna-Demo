import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsRateDifferentialMasterComponent } from './tds-rate-differential-master.component';

describe('TdsRateDifferentialMasterComponent', () => {
  let component: TdsRateDifferentialMasterComponent;
  let fixture: ComponentFixture<TdsRateDifferentialMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdsRateDifferentialMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdsRateDifferentialMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

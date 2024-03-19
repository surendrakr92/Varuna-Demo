import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTdsRateDifferentialMasterComponent } from './create-tds-rate-differential-master.component';

describe('CreateTdsRateDifferentialMasterComponent', () => {
  let component: CreateTdsRateDifferentialMasterComponent;
  let fixture: ComponentFixture<CreateTdsRateDifferentialMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTdsRateDifferentialMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTdsRateDifferentialMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

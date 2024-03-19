import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwayBillCorrectionComponent } from './eway-bill-correction.component';

describe('EwayBillCorrectionComponent', () => {
  let component: EwayBillCorrectionComponent;
  let fixture: ComponentFixture<EwayBillCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EwayBillCorrectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EwayBillCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

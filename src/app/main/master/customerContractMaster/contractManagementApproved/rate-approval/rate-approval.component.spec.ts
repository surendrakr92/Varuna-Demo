import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateApprovalComponent } from './rate-approval.component';

describe('RateApprovalComponent', () => {
  let component: RateApprovalComponent;
  let fixture: ComponentFixture<RateApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

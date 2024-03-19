import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodapprovalComponent } from './podapproval.component';

describe('PodapprovalComponent', () => {
  let component: PodapprovalComponent;
  let fixture: ComponentFixture<PodapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodapprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

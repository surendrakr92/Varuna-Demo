import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ELRDashboardComponent } from './elr-dashboard.component';

describe('ELRDashboardComponent', () => {
  let component: ELRDashboardComponent;
  let fixture: ComponentFixture<ELRDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ELRDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ELRDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

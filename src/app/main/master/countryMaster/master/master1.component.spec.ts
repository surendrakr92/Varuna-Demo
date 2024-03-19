import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Master1Component } from './master1.component';

describe('Master1Component', () => {
  let component: Master1Component;
  let fixture: ComponentFixture<Master1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Master1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Master1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

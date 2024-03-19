import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPinCodeComponent } from './view-pin-code.component';

describe('ViewPinCodeComponent', () => {
  let component: ViewPinCodeComponent;
  let fixture: ComponentFixture<ViewPinCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPinCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPinCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyAutoTHCComponent } from './empty-auto-thc.component';

describe('EmptyAutoTHCComponent', () => {
  let component: EmptyAutoTHCComponent;
  let fixture: ComponentFixture<EmptyAutoTHCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyAutoTHCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyAutoTHCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

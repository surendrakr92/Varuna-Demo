import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvrIvrEntryComponent } from './ovr-ivr-entry.component';

describe('OvrIvrEntryComponent', () => {
  let component: OvrIvrEntryComponent;
  let fixture: ComponentFixture<OvrIvrEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvrIvrEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvrIvrEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOvrIvrEntryComponent } from './create-ovr-ivr-entry.component';

describe('CreateOvrIvrEntryComponent', () => {
  let component: CreateOvrIvrEntryComponent;
  let fixture: ComponentFixture<CreateOvrIvrEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOvrIvrEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOvrIvrEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

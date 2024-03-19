import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePODLocationComponent } from './change-pod-location.component';

describe('ChangePODLocationComponent', () => {
  let component: ChangePODLocationComponent;
  let fixture: ComponentFixture<ChangePODLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePODLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePODLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

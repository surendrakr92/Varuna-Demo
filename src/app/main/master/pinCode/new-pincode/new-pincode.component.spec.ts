import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPincodeComponent } from './new-pincode.component';

describe('NewPincodeComponent', () => {
  let component: NewPincodeComponent;
  let fixture: ComponentFixture<NewPincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPincodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

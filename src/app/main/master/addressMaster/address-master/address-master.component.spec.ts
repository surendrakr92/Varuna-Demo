import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressMasterComponent } from './address-master.component';

describe('AddressMasterComponent', () => {
  let component: AddressMasterComponent;
  let fixture: ComponentFixture<AddressMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

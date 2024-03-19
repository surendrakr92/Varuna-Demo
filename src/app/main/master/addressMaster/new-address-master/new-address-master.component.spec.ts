import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddressMasterComponent } from './new-address-master.component';

describe('NewAddressMasterComponent', () => {
  let component: NewAddressMasterComponent;
  let fixture: ComponentFixture<NewAddressMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAddressMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAddressMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupClosureComponent } from './pickup-closure.component';

describe('PickupClosureComponent', () => {
  let component: PickupClosureComponent;
  let fixture: ComponentFixture<PickupClosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupClosureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

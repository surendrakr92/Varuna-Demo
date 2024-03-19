import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupRequestViewComponent } from './pickup-request-view.component';

describe('PickupRequestViewComponent', () => {
  let component: PickupRequestViewComponent;
  let fixture: ComponentFixture<PickupRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupRequestViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

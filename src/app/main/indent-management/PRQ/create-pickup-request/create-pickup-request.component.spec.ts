import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePickupRequestComponent } from './CreatePickupRequestComponent';

describe('CreatePickupRequestComponent', () => {
  let component: CreatePickupRequestComponent;
  let fixture: ComponentFixture<CreatePickupRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePickupRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePickupRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

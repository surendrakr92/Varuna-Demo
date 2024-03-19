import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMvAvailabilityComponent } from './create-mv-availability.component';

describe('CreateMvAvailabilityComponent', () => {
  let component: CreateMvAvailabilityComponent;
  let fixture: ComponentFixture<CreateMvAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMvAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMvAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

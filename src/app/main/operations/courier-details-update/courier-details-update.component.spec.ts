import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDetailsUpdateComponent } from './courier-details-update.component';

describe('CourierDetailsUpdateComponent', () => {
  let component: CourierDetailsUpdateComponent;
  let fixture: ComponentFixture<CourierDetailsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierDetailsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

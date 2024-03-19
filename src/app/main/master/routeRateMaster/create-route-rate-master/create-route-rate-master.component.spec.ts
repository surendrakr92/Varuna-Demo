import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRouteRateMasterComponent } from './create-route-rate-master.component';

describe('CreateRouteRateMasterComponent', () => {
  let component: CreateRouteRateMasterComponent;
  let fixture: ComponentFixture<CreateRouteRateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRouteRateMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRouteRateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

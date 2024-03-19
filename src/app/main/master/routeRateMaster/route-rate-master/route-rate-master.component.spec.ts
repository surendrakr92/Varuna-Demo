import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteRateMasterComponent } from './route-rate-master.component';

describe('RouteRateMasterComponent', () => {
  let component: RouteRateMasterComponent;
  let fixture: ComponentFixture<RouteRateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteRateMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteRateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

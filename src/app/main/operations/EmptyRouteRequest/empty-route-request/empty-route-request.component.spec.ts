import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyRouteRequestComponent } from './empty-route-request.component';

describe('EmptyRouteRequestComponent', () => {
  let component: EmptyRouteRequestComponent;
  let fixture: ComponentFixture<EmptyRouteRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyRouteRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyRouteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

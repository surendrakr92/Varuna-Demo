import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRouteMasterComponent } from './view-route-master.component';

describe('ViewRouteMasterComponent', () => {
  let component: ViewRouteMasterComponent;
  let fixture: ComponentFixture<ViewRouteMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRouteMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRouteMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

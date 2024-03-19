import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMasterListComponent } from './route-master-list.component';

describe('RouteMasterListComponent', () => {
  let component: RouteMasterListComponent;
  let fixture: ComponentFixture<RouteMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRouteMasterComponent } from './create-route-master.component';

describe('CreateRouteMasterComponent', () => {
  let component: CreateRouteMasterComponent;
  let fixture: ComponentFixture<CreateRouteMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRouteMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRouteMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

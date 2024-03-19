import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintForwardComponent } from './complaint-fwd.component';



describe('ComplaintForwardComponent', () => {
  let component: ComplaintForwardComponent;
  let fixture: ComponentFixture<ComplaintForwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintForwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

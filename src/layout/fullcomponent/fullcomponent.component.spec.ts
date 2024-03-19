import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullcomponentComponent } from './fullcomponent.component';

describe('FullcomponentComponent', () => {
  let component: FullcomponentComponent;
  let fixture: ComponentFixture<FullcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendewaybillexpiryComponent } from './extendewaybillexpiry.component';

describe('ExtendewaybillexpiryComponent', () => {
  let component: ExtendewaybillexpiryComponent;
  let fixture: ComponentFixture<ExtendewaybillexpiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendewaybillexpiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtendewaybillexpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

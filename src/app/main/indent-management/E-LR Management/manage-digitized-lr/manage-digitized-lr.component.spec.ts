import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDigitizedLRComponent } from './manage-digitized-lr.component';

describe('ManageDigitizedLRComponent', () => {
  let component: ManageDigitizedLRComponent;
  let fixture: ComponentFixture<ManageDigitizedLRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDigitizedLRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDigitizedLRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

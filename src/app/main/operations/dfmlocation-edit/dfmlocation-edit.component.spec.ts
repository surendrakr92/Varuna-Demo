import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DFMLocationEditComponent } from './dfmlocation-edit.component';

describe('DFMLocationEditComponent', () => {
  let component: DFMLocationEditComponent;
  let fixture: ComponentFixture<DFMLocationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DFMLocationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DFMLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

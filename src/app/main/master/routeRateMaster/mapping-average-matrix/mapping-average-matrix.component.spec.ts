import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingAverageMatrixComponent } from './mapping-average-matrix.component';

describe('MappingAverageMatrixComponent', () => {
  let component: MappingAverageMatrixComponent;
  let fixture: ComponentFixture<MappingAverageMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingAverageMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MappingAverageMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMappingAverageMatrixComponent } from './create-mapping-average-matrix.component';

describe('CreateMappingAverageMatrixComponent', () => {
  let component: CreateMappingAverageMatrixComponent;
  let fixture: ComponentFixture<CreateMappingAverageMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMappingAverageMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMappingAverageMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

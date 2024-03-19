import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedProductComponent } from './mapped-product.component';

describe('MappedProductComponent', () => {
  let component: MappedProductComponent;
  let fixture: ComponentFixture<MappedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappedProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MappedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

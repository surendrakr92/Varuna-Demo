import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnMappedProductComponent } from './un-mapped-product.component';

describe('UnMappedProductComponent', () => {
  let component: UnMappedProductComponent;
  let fixture: ComponentFixture<UnMappedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnMappedProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnMappedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

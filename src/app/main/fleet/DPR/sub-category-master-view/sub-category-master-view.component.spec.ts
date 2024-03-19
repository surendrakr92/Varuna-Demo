import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryMasterViewComponent } from './sub-category-master-view.component';

describe('SubCategoryMasterViewComponent', () => {
  let component: SubCategoryMasterViewComponent;
  let fixture: ComponentFixture<SubCategoryMasterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryMasterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

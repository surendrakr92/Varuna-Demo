import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCategoryMasterViewComponent } from './main-category-master-view.component';

describe('MainCategoryMasterViewComponent', () => {
  let component: MainCategoryMasterViewComponent;
  let fixture: ComponentFixture<MainCategoryMasterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCategoryMasterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCategoryMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

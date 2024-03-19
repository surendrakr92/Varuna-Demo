import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCategoryMasterListComponent } from './main-category-master-list.component';

describe('MainCategoryMasterListComponent', () => {
  let component: MainCategoryMasterListComponent;
  let fixture: ComponentFixture<MainCategoryMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCategoryMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCategoryMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

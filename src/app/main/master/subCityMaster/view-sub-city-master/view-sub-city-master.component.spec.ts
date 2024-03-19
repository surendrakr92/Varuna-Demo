import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubCityMasterComponent } from './view-sub-city-master.component';

describe('ViewSubCityMasterComponent', () => {
  let component: ViewSubCityMasterComponent;
  let fixture: ComponentFixture<ViewSubCityMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubCityMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubCityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

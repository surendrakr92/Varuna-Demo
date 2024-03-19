import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCityMasterComponent } from './sub-city-master.component';

describe('SubCityMasterComponent', () => {
  let component: SubCityMasterComponent;
  let fixture: ComponentFixture<SubCityMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCityMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

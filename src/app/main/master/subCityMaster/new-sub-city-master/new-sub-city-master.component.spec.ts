import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubCityMasterComponent } from './new-sub-city-master.component';

describe('NewSubCityMasterComponent', () => {
  let component: NewSubCityMasterComponent;
  let fixture: ComponentFixture<NewSubCityMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubCityMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSubCityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

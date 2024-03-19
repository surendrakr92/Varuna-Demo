import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCityMasterComponent } from './view-city-master.component';

describe('ViewCityMasterComponent', () => {
  let component: ViewCityMasterComponent;
  let fixture: ComponentFixture<ViewCityMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCityMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

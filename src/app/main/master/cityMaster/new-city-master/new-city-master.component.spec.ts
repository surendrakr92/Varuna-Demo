import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCityMasterComponent } from './new-city-master.component';

describe('NewCityMasterComponent', () => {
  let component: NewCityMasterComponent;
  let fixture: ComponentFixture<NewCityMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCityMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

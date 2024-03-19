import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLandMasterComponent } from './view-land-master.component';

describe('ViewLandMasterComponent', () => {
  let component: ViewLandMasterComponent;
  let fixture: ComponentFixture<ViewLandMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLandMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLandMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

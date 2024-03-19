import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLandMasterComponent } from './new-land-master.component';

describe('NewLandMasterComponent', () => {
  let component: NewLandMasterComponent;
  let fixture: ComponentFixture<NewLandMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLandMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLandMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMasterComponent } from './general-master.component';

describe('GeneralMasterComponent', () => {
  let component: GeneralMasterComponent;
  let fixture: ComponentFixture<GeneralMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

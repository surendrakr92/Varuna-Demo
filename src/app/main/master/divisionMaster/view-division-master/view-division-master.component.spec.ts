import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDivisionMasterComponent } from './view-division-master.component';

describe('ViewDivisionMasterComponent', () => {
  let component: ViewDivisionMasterComponent;
  let fixture: ComponentFixture<ViewDivisionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDivisionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDivisionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

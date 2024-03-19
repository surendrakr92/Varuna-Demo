import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBEMasterComponent } from './view-be-master.component';



describe('ViewBEMasterComponent', () => {
  let component: ViewBEMasterComponent;
  let fixture: ComponentFixture<ViewBEMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        
      declarations: [ ViewBEMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBEMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

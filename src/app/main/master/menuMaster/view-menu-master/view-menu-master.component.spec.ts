import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMenuMasterComponent } from './view-menu-master.component';

describe('ViewMenuMasterComponent', () => {
  let component: ViewMenuMasterComponent;
  let fixture: ComponentFixture<ViewMenuMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMenuMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMenuMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

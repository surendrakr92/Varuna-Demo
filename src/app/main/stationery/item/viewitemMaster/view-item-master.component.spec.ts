import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemMasterComponent } from './view-item-master.component';

describe('ViewStateMasterComponent', () => {
  let component: ViewItemMasterComponent;
  let fixture: ComponentFixture<ViewItemMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItemMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

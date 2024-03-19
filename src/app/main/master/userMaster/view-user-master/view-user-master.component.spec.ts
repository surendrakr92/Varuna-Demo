import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserMasterComponent } from './view-user-master.component';

describe('ViewUserMasterComponent', () => {
  let component: ViewUserMasterComponent;
  let fixture: ComponentFixture<ViewUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

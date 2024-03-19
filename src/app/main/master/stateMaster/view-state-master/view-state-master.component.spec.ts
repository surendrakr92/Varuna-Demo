import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStateMasterComponent } from './view-state-master.component';

describe('ViewStateMasterComponent', () => {
  let component: ViewStateMasterComponent;
  let fixture: ComponentFixture<ViewStateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStateMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

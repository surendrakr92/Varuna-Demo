import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClusterMasterComponent } from './view-cluster-master.component';

describe('ViewClusterMasterComponent', () => {
  let component: ViewClusterMasterComponent;
  let fixture: ComponentFixture<ViewClusterMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClusterMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClusterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

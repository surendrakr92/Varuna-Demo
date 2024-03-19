import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubClusterMasterComponent } from './view-sub-cluster-master.component';

describe('ViewSubClusterMasterComponent', () => {
  let component: ViewSubClusterMasterComponent;
  let fixture: ComponentFixture<ViewSubClusterMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubClusterMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubClusterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

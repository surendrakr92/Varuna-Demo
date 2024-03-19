import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterMasterComponent } from './cluster-master.component';

describe('ClusterMasterComponent', () => {
  let component: ClusterMasterComponent;
  let fixture: ComponentFixture<ClusterMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

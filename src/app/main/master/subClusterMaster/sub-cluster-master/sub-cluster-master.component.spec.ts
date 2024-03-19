import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClusterMasterComponent } from './sub-cluster-master.component';

describe('SubClusterMasterComponent', () => {
  let component: SubClusterMasterComponent;
  let fixture: ComponentFixture<SubClusterMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubClusterMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubClusterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

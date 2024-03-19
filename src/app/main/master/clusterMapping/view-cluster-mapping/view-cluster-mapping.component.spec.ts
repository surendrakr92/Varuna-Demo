import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClusterMappingComponent } from './view-cluster-mapping.component';

describe('ViewClusterMappingComponent', () => {
  let component: ViewClusterMappingComponent;
  let fixture: ComponentFixture<ViewClusterMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClusterMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClusterMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

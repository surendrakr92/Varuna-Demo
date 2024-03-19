import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterMappingComponent } from './cluster-mapping.component';

describe('ClusterMappingComponent', () => {
  let component: ClusterMappingComponent;
  let fixture: ComponentFixture<ClusterMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

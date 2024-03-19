import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClusterMappingComponent } from './new-cluster-mapping.component';

describe('NewClusterMappingComponent', () => {
  let component: NewClusterMappingComponent;
  let fixture: ComponentFixture<NewClusterMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClusterMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClusterMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubClusterMasterComponent } from './new-sub-cluster-master.component';

describe('NewSubClusterMasterComponent', () => {
  let component: NewSubClusterMasterComponent;
  let fixture: ComponentFixture<NewSubClusterMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubClusterMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSubClusterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

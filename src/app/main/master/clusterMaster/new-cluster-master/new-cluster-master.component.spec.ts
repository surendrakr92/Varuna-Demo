import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClusterMasterComponent } from './new-cluster-master.component';

describe('NewClusterMasterComponent', () => {
  let component: NewClusterMasterComponent;
  let fixture: ComponentFixture<NewClusterMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClusterMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClusterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

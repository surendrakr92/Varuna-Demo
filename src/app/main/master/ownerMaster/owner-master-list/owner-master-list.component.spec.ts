import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMasterListComponent } from './owner-master-list.component';

describe('OwnerMasterListComponent', () => {
  let component: OwnerMasterListComponent;
  let fixture: ComponentFixture<OwnerMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

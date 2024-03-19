import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGenMasterListComponent } from './update-gen-master-list.component';

describe('UpdateGenMasterListComponent', () => {
  let component: UpdateGenMasterListComponent;
  let fixture: ComponentFixture<UpdateGenMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGenMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGenMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupMasterComponent } from './create-group-master.component';

describe('CreateGroupMasterComponent', () => {
  let component: CreateGroupMasterComponent;
  let fixture: ComponentFixture<CreateGroupMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaneMasterListComponent } from './lane-master-list.component';

describe('LaneMasterListComponent', () => {
  let component: LaneMasterListComponent;
  let fixture: ComponentFixture<LaneMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaneMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaneMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

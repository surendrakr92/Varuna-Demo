import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CngrCngeMasterListComponent } from './cngr-cnge-master-list.component';

describe('CngrCngeMasterListComponent', () => {
  let component: CngrCngeMasterListComponent;
  let fixture: ComponentFixture<CngrCngeMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CngrCngeMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CngrCngeMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

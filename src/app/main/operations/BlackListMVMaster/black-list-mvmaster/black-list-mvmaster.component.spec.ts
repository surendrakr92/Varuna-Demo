import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackListMVMasterComponent } from './black-list-mvmaster.component';

describe('BlackListMVMasterComponent', () => {
  let component: BlackListMVMasterComponent;
  let fixture: ComponentFixture<BlackListMVMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackListMVMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackListMVMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

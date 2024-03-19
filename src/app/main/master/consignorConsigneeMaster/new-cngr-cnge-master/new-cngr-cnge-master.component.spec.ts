import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCngrCngeMasterComponent } from './new-cngr-cnge-master.component';

describe('NewCngrCngeMasterComponent', () => {
  let component: NewCngrCngeMasterComponent;
  let fixture: ComponentFixture<NewCngrCngeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCngrCngeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCngrCngeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

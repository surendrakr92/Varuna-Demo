import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDivisionMasterComponent } from './new-division-master.component';

describe('NewDivisionMasterComponent', () => {
  let component: NewDivisionMasterComponent;
  let fixture: ComponentFixture<NewDivisionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDivisionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDivisionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

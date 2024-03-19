import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCodeTypeMasterComponent } from './new-code-type-master.component';

describe('NewCodeTypeMasterComponent', () => {
  let component: NewCodeTypeMasterComponent;
  let fixture: ComponentFixture<NewCodeTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCodeTypeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCodeTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

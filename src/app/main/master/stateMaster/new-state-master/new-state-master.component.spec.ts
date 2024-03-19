import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStateMasterComponent } from './new-state-master.component';

describe('CreateStateMasterNewComponent', () => {
  let component: NewStateMasterComponent;
  let fixture: ComponentFixture<NewStateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStateMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

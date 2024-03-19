import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewComponent } from './new-country-master';

describe('CreateNewComponent', () => {
  let component: CreateNewComponent;
  let fixture: ComponentFixture<CreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

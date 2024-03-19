import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardDocumentComponent } from './forward-document.component';

describe('ForwardDocumentComponent', () => {
  let component: ForwardDocumentComponent;
  let fixture: ComponentFixture<ForwardDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgeDocumentComponent } from './acknowledge-document.component';

describe('AcknowledgeDocumentComponent', () => {
  let component: AcknowledgeDocumentComponent;
  let fixture: ComponentFixture<AcknowledgeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcknowledgeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcknowledgeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

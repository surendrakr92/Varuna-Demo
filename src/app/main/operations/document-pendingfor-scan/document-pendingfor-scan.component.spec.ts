import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPendingforScanComponent } from './document-pendingfor-scan.component';

describe('DocumentPendingforScanComponent', () => {
  let component: DocumentPendingforScanComponent;
  let fixture: ComponentFixture<DocumentPendingforScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPendingforScanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPendingforScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

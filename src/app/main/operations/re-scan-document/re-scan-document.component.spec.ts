import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReScanDocumentComponent } from './re-scan-document.component';

describe('ReScanDocumentComponent', () => {
  let component: ReScanDocumentComponent;
  let fixture: ComponentFixture<ReScanDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReScanDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReScanDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

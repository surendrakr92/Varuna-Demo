import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuploadInvoiceCopyComponent } from './reupload-invoice-copy.component';

describe('ReuploadInvoiceCopyComponent', () => {
  let component: ReuploadInvoiceCopyComponent;
  let fixture: ComponentFixture<ReuploadInvoiceCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReuploadInvoiceCopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReuploadInvoiceCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPODCopyComponent } from './upload-podcopy.component';

describe('UploadPODCopyComponent', () => {
  let component: UploadPODCopyComponent;
  let fixture: ComponentFixture<UploadPODCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPODCopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPODCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

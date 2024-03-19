import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSopComponent } from './upload-sop.component';

describe('UploadSopComponent', () => {
  let component: UploadSopComponent;
  let fixture: ComponentFixture<UploadSopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

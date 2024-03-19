import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadCongfigrationComponent } from './file-upload-congfigration.component';

describe('FileUploadCongfigrationComponent', () => {
  let component: FileUploadCongfigrationComponent;
  let fixture: ComponentFixture<FileUploadCongfigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadCongfigrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadCongfigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

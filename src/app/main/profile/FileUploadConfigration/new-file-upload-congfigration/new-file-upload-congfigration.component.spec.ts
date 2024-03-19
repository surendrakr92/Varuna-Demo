import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFileUploadCongfigrationComponent } from './new-file-upload-congfigration.component';

describe('NewFileUploadCongfigrationComponent', () => {
  let component: NewFileUploadCongfigrationComponent;
  let fixture: ComponentFixture<NewFileUploadCongfigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFileUploadCongfigrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFileUploadCongfigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

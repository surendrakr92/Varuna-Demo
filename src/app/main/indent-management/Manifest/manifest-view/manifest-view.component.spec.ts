import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestViewComponent } from './manifest-view.component';

describe('ManifestViewComponent', () => {
  let component: ManifestViewComponent;
  let fixture: ComponentFixture<ManifestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

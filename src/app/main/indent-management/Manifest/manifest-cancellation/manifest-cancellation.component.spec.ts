import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestCancellationComponent } from './manifest-cancellation.component';

describe('ManifestCancellationComponent', () => {
  let component: ManifestCancellationComponent;
  let fixture: ComponentFixture<ManifestCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestCancellationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifestCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

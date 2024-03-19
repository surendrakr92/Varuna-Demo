import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestArrivalComponent } from './manifest-arrival.component';

describe('ManifestArrivalComponent', () => {
  let component: ManifestArrivalComponent;
  let fixture: ComponentFixture<ManifestArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestArrivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifestArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

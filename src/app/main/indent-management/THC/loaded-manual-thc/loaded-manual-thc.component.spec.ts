import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedManualThcComponent } from './loaded-manual-thc.component';

describe('LoadedManualThcComponent', () => {
  let component: LoadedManualThcComponent;
  let fixture: ComponentFixture<LoadedManualThcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadedManualThcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadedManualThcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

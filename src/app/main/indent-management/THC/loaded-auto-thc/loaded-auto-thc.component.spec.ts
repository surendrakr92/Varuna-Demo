import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedAutoThcComponent } from './loaded-auto-thc.component';

describe('LoadedAutoThcComponent', () => {
  let component: LoadedAutoThcComponent;
  let fixture: ComponentFixture<LoadedAutoThcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadedAutoThcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadedAutoThcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsRateMasterComponent } from './tds-rate-master.component';

describe('TdsRateMasterComponent', () => {
  let component: TdsRateMasterComponent;
  let fixture: ComponentFixture<TdsRateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdsRateMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdsRateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

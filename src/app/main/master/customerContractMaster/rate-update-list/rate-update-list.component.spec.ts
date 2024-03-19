import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateUpdateListComponent } from './RateUpdateListComponent';

describe('RateUpdateListComponent', () => {
  let component: RateUpdateListComponent;
  let fixture: ComponentFixture<RateUpdateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateUpdateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocketCancellationComponent } from './docket-cancellation.component';

describe('DocketCancellationComponent', () => {
  let component: DocketCancellationComponent;
  let fixture: ComponentFixture<DocketCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocketCancellationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocketCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

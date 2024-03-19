import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrqClosureUpdateComponent } from './prq-closure-update.component';

describe('PrqClosureUpdateComponent', () => {
  let component: PrqClosureUpdateComponent;
  let fixture: ComponentFixture<PrqClosureUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrqClosureUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrqClosureUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUpdateListComponent } from './stock-update-list.component';

describe('StockUpdateListComponent', () => {
  let component: StockUpdateListComponent;
  let fixture: ComponentFixture<StockUpdateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockUpdateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

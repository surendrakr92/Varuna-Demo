import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocketListComponent } from './docket-list.component';

describe('DocketListComponent', () => {
  let component: DocketListComponent;
  let fixture: ComponentFixture<DocketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocketListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

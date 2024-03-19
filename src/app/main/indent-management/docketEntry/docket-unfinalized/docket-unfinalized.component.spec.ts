import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocketUnfinalizedComponent } from './docket-unfinalized.component';

describe('DocketUnfinalizedComponent', () => {
  let component: DocketUnfinalizedComponent;
  let fixture: ComponentFixture<DocketUnfinalizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocketUnfinalizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocketUnfinalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

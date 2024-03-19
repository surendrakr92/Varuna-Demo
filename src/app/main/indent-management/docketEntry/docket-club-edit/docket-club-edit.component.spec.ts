import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocketClubEditComponent } from './docket-club-edit.component';

describe('DocketClubEditComponent', () => {
  let component: DocketClubEditComponent;
  let fixture: ComponentFixture<DocketClubEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocketClubEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocketClubEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocketEntryComponent } from './docket-entry.component';

describe('DocketEntryComponent', () => {
  let component: DocketEntryComponent;
  let fixture: ComponentFixture<DocketEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocketEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocketEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

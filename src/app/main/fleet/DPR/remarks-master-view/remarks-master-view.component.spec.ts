import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarksMasterViewComponent } from './remarks-master-view.component';

describe('RemarksMasterViewComponent', () => {
  let component: RemarksMasterViewComponent;
  let fixture: ComponentFixture<RemarksMasterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarksMasterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarksMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarksMasterComponent } from './remarks-master.component';

describe('RemarksMasterComponent', () => {
  let component: RemarksMasterComponent;
  let fixture: ComponentFixture<RemarksMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarksMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarksMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

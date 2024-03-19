import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreceiptitemlistComponent } from './viewreceiptitemlist.component';

describe('ViewreceiptitemlistComponent', () => {
  let component: ViewreceiptitemlistComponent;
  let fixture: ComponentFixture<ViewreceiptitemlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewreceiptitemlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewreceiptitemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

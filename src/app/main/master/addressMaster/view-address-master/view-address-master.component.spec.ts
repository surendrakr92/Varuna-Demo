import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddressMasterComponent } from './view-address-master.component';

describe('ViewAddressMasterComponent', () => {
  let component: ViewAddressMasterComponent;
  let fixture: ComponentFixture<ViewAddressMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAddressMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAddressMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

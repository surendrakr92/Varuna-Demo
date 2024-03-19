import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMenuMasterComponent } from './new-menu-master.component';

describe('NewMenuMasterComponent', () => {
  let component: NewMenuMasterComponent;
  let fixture: ComponentFixture<NewMenuMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMenuMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMenuMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

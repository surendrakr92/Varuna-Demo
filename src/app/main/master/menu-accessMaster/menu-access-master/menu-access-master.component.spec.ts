import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccessMasterComponent } from './menu-access-master.component';

describe('MenuAccessMasterComponent', () => {
  let component: MenuAccessMasterComponent;
  let fixture: ComponentFixture<MenuAccessMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAccessMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAccessMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

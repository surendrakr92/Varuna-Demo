import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuAccessMasterComponent } from './create-menu-access-master.component';

describe('CreateMenuAccessMasterComponent', () => {
  let component: CreateMenuAccessMasterComponent;
  let fixture: ComponentFixture<CreateMenuAccessMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMenuAccessMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMenuAccessMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

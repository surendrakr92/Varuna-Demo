import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMasterComponent } from './create-item-master.component';

describe('CreateItemMasterComponent', () => {
  let component: CreateMasterComponent;
  let fixture: ComponentFixture<CreateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

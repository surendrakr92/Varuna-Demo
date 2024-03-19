import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequistionComponent } from './createrequistion-master.component';

describe('CreateItemMasterComponent', () => {
  let component: CreateRequistionComponent;
  let fixture: ComponentFixture<CreateRequistionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRequistionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequistionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

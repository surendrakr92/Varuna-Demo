import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSopComponent } from './manage-sop.component';

describe('ManageSopComponent', () => {
  let component: ManageSopComponent;
  let fixture: ComponentFixture<ManageSopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

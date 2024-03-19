import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCodeTypeMasterComponent } from './view-code-type-master.component';

describe('ViewCodeTypeMasterComponent', () => {
  let component: ViewCodeTypeMasterComponent;
  let fixture: ComponentFixture<ViewCodeTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCodeTypeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCodeTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

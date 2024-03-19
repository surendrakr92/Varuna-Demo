import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventMappingMasterComponent } from './create-event-mapping-master.component';

describe('CreateEventMappingMasterComponent', () => {
  let component: CreateEventMappingMasterComponent;
  let fixture: ComponentFixture<CreateEventMappingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventMappingMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventMappingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

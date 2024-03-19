import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPickupRequestComponent } from './list-of-pickup-request.component';

describe('ListOfPickupRequestComponent', () => {
  let component: ListOfPickupRequestComponent;
  let fixture: ComponentFixture<ListOfPickupRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfPickupRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfPickupRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

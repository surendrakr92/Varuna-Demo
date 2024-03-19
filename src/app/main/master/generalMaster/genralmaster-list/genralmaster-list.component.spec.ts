import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenralmasterListComponent } from './genralmaster-list.component';

describe('GenralmasterListComponent', () => {
  let component: GenralmasterListComponent;
  let fixture: ComponentFixture<GenralmasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenralmasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenralmasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

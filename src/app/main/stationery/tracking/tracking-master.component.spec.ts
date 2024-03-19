import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingComponent } from './tracking-master.component';


describe('RequistionMasterComponent', () => {
  let component: TrackingComponent;
  let fixture: ComponentFixture<TrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
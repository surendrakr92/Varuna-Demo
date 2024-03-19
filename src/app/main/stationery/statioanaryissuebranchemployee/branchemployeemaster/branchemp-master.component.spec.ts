import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatioaneryissueMasterComponent } from './branchemp-master.component';



describe('StatioaneryissueMasterComponent', () => {
  let component: StatioaneryissueMasterComponent;
  let fixture: ComponentFixture<StatioaneryissueMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatioaneryissueMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatioaneryissueMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
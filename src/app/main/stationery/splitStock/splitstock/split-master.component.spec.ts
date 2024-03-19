import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitComponent } from './split-master.component';



describe('SplitComponent', () => {
  let component: SplitComponent;
  let fixture: ComponentFixture<SplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
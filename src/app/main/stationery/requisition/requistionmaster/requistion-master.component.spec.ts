import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequistionMasterComponent } from './requistion-master.component';




describe('RequistionMasterComponent', () => {
  let component: RequistionMasterComponent;
  let fixture: ComponentFixture<RequistionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequistionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequistionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
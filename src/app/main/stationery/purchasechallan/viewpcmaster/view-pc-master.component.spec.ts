import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPCMasterComponent } from './view-pc-master.component';



describe('ViewPCMasterComponent', () => {
  let component: ViewPCMasterComponent;
  let fixture: ComponentFixture<ViewPCMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        
      declarations: [ ViewPCMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPCMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

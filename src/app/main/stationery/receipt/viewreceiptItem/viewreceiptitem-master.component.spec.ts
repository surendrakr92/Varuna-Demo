import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceiptItemComponent } from './viewreceiptitem-master.component';



describe('ReceiptItemComponent', () => {
  let component: ReceiptItemComponent;
  let fixture: ComponentFixture<ReceiptItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
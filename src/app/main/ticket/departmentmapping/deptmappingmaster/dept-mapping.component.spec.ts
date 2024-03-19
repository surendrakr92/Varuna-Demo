import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentMappingComponent } from './dept-mapping.component';




describe('DepartmentMappingComponent', () => {
  let component: DepartmentMappingComponent;
  let fixture: ComponentFixture<DepartmentMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

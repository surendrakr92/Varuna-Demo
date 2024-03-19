import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractBasicInfoComponent } from './contract-basic-info.component';

describe('ContractBasicInfoComponent', () => {
  let component: ContractBasicInfoComponent;
  let fixture: ComponentFixture<ContractBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractBasicInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

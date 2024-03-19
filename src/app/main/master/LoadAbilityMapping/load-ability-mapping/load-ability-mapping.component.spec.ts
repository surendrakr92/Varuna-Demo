import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAbilityMappingComponent } from './load-ability-mapping.component';

describe('LoadAbilityMappingComponent', () => {
  let component: LoadAbilityMappingComponent;
  let fixture: ComponentFixture<LoadAbilityMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadAbilityMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadAbilityMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

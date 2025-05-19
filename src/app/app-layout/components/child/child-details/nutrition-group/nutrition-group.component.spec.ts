import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionGroupComponent } from './nutrition-group.component';

describe('NutritionGroupComponent', () => {
  let component: NutritionGroupComponent;
  let fixture: ComponentFixture<NutritionGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionGroupComponent],
    });
    fixture = TestBed.createComponent(NutritionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanMealsComponent } from './meal-plan-meals.component';

describe('MealPlanMealsComponent', () => {
  let component: MealPlanMealsComponent;
  let fixture: ComponentFixture<MealPlanMealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlanMealsComponent],
    });
    fixture = TestBed.createComponent(MealPlanMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

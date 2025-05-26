import { Meal } from './meal';

export interface MealPlan {
  _id?: string;
  name: string;
  monday: MealPlanDay;
  tuesday: MealPlanDay;
  wednesday: MealPlanDay;
  thursday: MealPlanDay;
  friday: MealPlanDay;
}

export interface MealPlanDay {
  date: Date;
  meals: Meal[];
}

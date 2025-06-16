import { Menu } from './menu';

export interface MealPlan {
  _id?: string;
  name: string;
  startDate: Date;
  monday: MealPlanDay;
  tuesday: MealPlanDay;
  wednesday: MealPlanDay;
  thursday: MealPlanDay;
  friday: MealPlanDay;
}

export interface MealPlanDay {
  date: Date;
  menu: Menu;
}

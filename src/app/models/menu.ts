import { Meal } from './meal';

export interface Menu {
  _id?: string;
  name: string;
  meals: Meal[];
}

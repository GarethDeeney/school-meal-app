import { Allergen } from './allergen';
import { Ingredient } from './ingredient';

export interface Meal {
  _id?: string;
  name: string;
  ingredients: Ingredient[];
  allergens: Allergen[];
}

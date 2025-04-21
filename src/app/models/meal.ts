import { Allergen } from './allergen';
import { Ingredient } from './ingredient';

export interface Meal {
  _id?: string;
  name: string;
  ingredients: { ingredient: Ingredient; amount: number }[];
}

import { Allergen } from './allergen';
import { Nutrition } from './Nutrition';

export interface Ingredient {
  _id?: string;
  name: string;
  allergens: Allergen[];
  pricePerKG: number;
  nutrition: Nutrition;
}

const ingredient: Ingredient = {
  name: 'New Ingredient',
  allergens: [],
  pricePerKG: 1.00,
  nutrition: {
    energy: 100,
    fat: 100,
    saturates: 100,
    sugars: 100,
    salt: 100,
  },
};

const ingredient2: Ingredient = {
  name: 'New Ingredient',
  allergens: [],
  pricePerKG: 1.00,
  nutrition: {
    energy: 100,
    fat: 100,
    saturates: 100,
    sugars: 100,
    salt: 100,
  },
};

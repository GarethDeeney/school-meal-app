import { Allergen } from './allergen';
import { Nutrition } from './Nutrition';

export interface Ingredient {
  _id?: String;
  name: String;
  allergens: Allergen[];
  pricePerKG: String;
  nutritionalInformation: Nutrition;
}

const ingredient: Ingredient = {
  name: 'New Ingredient',
  allergens: [],
  pricePerKG: '9',
  nutritionalInformation: {
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
  pricePerKG: '9',
  nutritionalInformation: {
    energy: 100,
    fat: 100,
    saturates: 100,
    sugars: 100,
    salt: 100,
  },
};

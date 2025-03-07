export interface Allergen {
  _id?: string;
  name: string;
  reaction: string;
  specialRequirements: string;
}

const allergen: Allergen = {
  "name": "New Allergen",
  "reaction": "",
  "specialRequirements": "",
};

const allergen2: Allergen = {
  "name": "Another Allergen",
  "reaction": "",
  "specialRequirements": "",
};

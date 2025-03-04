export interface Allergen {
  _id?: String;
  name: String;
  reaction: String;
  specialRequirements: String;
}

const allergen: Allergen = {
  name: 'New Allergen',
  reaction: '',
  specialRequirements: '9',
};

const allergen2: Allergen = {
  name: 'Another Allergen',
  reaction: '',
  specialRequirements: '9',
};

export interface Child {
  _id?: string;
  name: string;
  allergens: [];
  year: string;
  meals: [];
}

const child: Child = {
  name: 'New Child',
  allergens: [],
  year: '9',
  meals: [],
};

const child2: Child = {
  name: 'Another Child',
  allergens: [],
  year: '10',
  meals: [],
};

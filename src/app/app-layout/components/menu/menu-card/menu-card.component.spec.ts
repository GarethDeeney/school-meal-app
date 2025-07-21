import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Ingredient } from 'src/app/models/ingredient';
import { MenuCardComponent } from './menu-card.component';

describe('MenuCardComponent', () => {
  let component: MenuCardComponent;
  let fixture: ComponentFixture<MenuCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCardComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
      ],
      imports: [MatExpansionModule, MatIconModule],
    });
    fixture = TestBed.createComponent(MenuCardComponent);
    component = fixture.componentInstance;

    component.menu = {
      _id: '1',
      name: 'Menu Name',
      meals: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the ingredient list', () => {
    const ingredients = [
      { amount: 10, ingredient: ingredient1 },
      { amount: 10, ingredient: ingredient2 },
      { amount: 10, ingredient: ingredient3 },
    ];
    expect(component.setIngredientList(ingredients)).toEqual(
      'ingredient 1, ingredient 2, ingredient 3'
    );
  });

  it('should set the allergen list', () => {
    let ingredients = [
      { amount: 10, ingredient: ingredient1 },
      { amount: 10, ingredient: ingredient2 },
      { amount: 10, ingredient: ingredient3 },
    ];

    expect(component.setAllergenList(ingredients)).toEqual('');

    ingredients[0] = {
      ...ingredients[0],
      ingredient: {
        ...ingredient1,
        allergens: [
          { _id: '1', name: 'Tofu', specialRequirements: '', reaction: '' },
          { _id: '2', name: 'Gluten', specialRequirements: '', reaction: '' },
          { _id: '3', name: 'Soy', specialRequirements: '', reaction: '' },
        ],
      },
    };
    expect(component.setAllergenList(ingredients)).toEqual('Tofu, Gluten, Soy');
  });
});

const ingredient1: Ingredient = {
  _id: '1',
  name: 'ingredient 1',
  pricePerKG: 1,
  allergens: [],
  nutrition: {
    calories: 0,
    energy: 0,
    fat: 0,
    saturates: 0,
    sugars: 0,
    salt: 0,
  },
};

const ingredient2: Ingredient = {
  ...ingredient1,
  _id: '2',
  name: 'ingredient 2',
};

const ingredient3: Ingredient = {
  ...ingredient1,
  _id: '3',
  name: 'ingredient 3',
};

import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MealPlanMealsComponent } from './meal-plan-meals.component';

fdescribe('MealPlanMealsComponent', () => {
  let component: MealPlanMealsComponent;
  let fixture: ComponentFixture<MealPlanMealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlanMealsComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
      ],
      imports: [MatExpansionModule, MatIconModule],
    });
    fixture = TestBed.createComponent(MealPlanMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list meal allergens', () => {
    let ingredients = meal.ingredients;
    expect(component.listAllergens(ingredients)).toEqual(['Tofu']);
    expect(component.listAllergens(ingredients).length).toEqual(1);

    ingredients = [
      {
        amount: 10,
        ingredient: {
          ...ingredients[0].ingredient,
          allergens: [
            { ...ingredients[0].ingredient.allergens[0], name: 'Tofu' },
            { ...ingredients[0].ingredient.allergens[0], name: 'Soy' },
            { ...ingredients[0].ingredient.allergens[0], name: 'Gluten' },
          ],
        },
      },
    ];

    expect(component.listAllergens(ingredients)).toEqual([
      'Tofu',
      'Soy',
      'Gluten',
    ]);
    expect(component.listAllergens(ingredients).length).toEqual(3);

    ingredients = [
      {
        amount: 10,
        ingredient: { ...ingredients[0].ingredient, allergens: [] },
      },
    ];

    expect(component.listAllergens(ingredients)).toEqual([]);
    expect(component.listAllergens(ingredients).length).toEqual(0);
  });

  it('should set date string', () => {
    let date = '2025-07-21T14:27:08.886Z'
    expect(component.setDateString(date)).toEqual('2025-07-21')

    date = '2025-08-01T14:27:08.886Z'
    expect(component.setDateString(date)).toEqual('2025-08-01')

  });
});

const meal = {
  _id: '1',
  name: 'Meal Name',
  ingredients: [
    {
      amount: 10,
      ingredient: {
        _id: '1',
        name: 'Tofu',
        allergens: [
          {
            _id: '1',
            name: 'Tofu',
            reaction: '',
            specialRequirements: '',
          },
        ],
        pricePerKG: 1,
        nutrition: {
          calories: 100,
          energy: 200,
          fat: 3,
          saturates: 4,
          sugars: 1,
          salt: 1,
        },
      },
    },
  ],
};

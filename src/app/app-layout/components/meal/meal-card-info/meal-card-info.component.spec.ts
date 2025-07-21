import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MealCardInfoComponent } from './meal-card-info.component';

describe('MealCardInfoComponent', () => {
  let component: MealCardInfoComponent;
  let fixture: ComponentFixture<MealCardInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealCardInfoComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
      ],
      imports: [ReactiveFormsModule, MatIconModule, MatExpansionModule],
    });
    fixture = TestBed.createComponent(MealCardInfoComponent);
    component = fixture.componentInstance;
    component.meal = meal;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get meal allergens', () => {
    let mockMeal = meal;
    expect(component.getMealAllergens(mockMeal.ingredients)).toEqual(['Tofu']);
    expect(component.getMealAllergens(mockMeal.ingredients).length).toEqual(1);

    mockMeal = {
      ...meal,
      ingredients: [
        {
          amount: 10,
          ingredient: {
            ...meal.ingredients[0].ingredient,
            allergens: [
              { _id: '1', name: 'Tofu', reaction: '', specialRequirements: '' },
              { _id: '2', name: 'Soy', reaction: '', specialRequirements: '' },
              {
                _id: '3',
                name: 'Gluten',
                reaction: '',
                specialRequirements: '',
              },
            ],
          },
        },
      ],
    };
    expect(component.getMealAllergens(mockMeal.ingredients)).toEqual([
      'Tofu',
      'Soy',
      'Gluten',
    ]);
    expect(component.getMealAllergens(mockMeal.ingredients).length).toEqual(3);

    mockMeal = {
      ...mockMeal,
      ingredients: [
        {
          amount: 0,
          ingredient: { ...mockMeal.ingredients[0].ingredient, allergens: [] },
        },
      ],
    };

    expect(component.getMealAllergens(mockMeal.ingredients)).toEqual([]);
    expect(component.getMealAllergens(mockMeal.ingredients).length).toEqual(0);
  });

  it('should retrieve nutritional values by property', () => {
    expect(component.getNutrtionalVal(meal.ingredients, 'calories')).toEqual(
      100
    );
    expect(component.getNutrtionalVal(meal.ingredients, 'saturates')).toEqual(
      4
    );

    expect(component.getNutrtionalVal(meal.ingredients, 'energy')).toEqual(200);
    expect(component.getNutrtionalVal(meal.ingredients, 'fat')).toEqual(3);
    expect(component.getNutrtionalVal(meal.ingredients, 'sugars')).toEqual(1);
    expect(component.getNutrtionalVal(meal.ingredients, 'salt')).toEqual(1);

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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ChildAddMealComponent } from './add-meal.component';
import { Meal } from 'src/app/models/meal';
import { DateTime } from 'luxon';

fdescribe('ChildAddMealComponent', () => {
  let component: ChildAddMealComponent;
  let fixture: ComponentFixture<ChildAddMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildAddMealComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideAnimations(),
        provideNativeDateAdapter(),
      ],
      imports: [
        MatInputModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        RouterTestingModule,
      ],
    });
    fixture = TestBed.createComponent(ChildAddMealComponent);
    component = fixture.componentInstance;

    component.data = {
      allergens: [],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should combine meal options', () => {
    const dayMeals: Meal[] = [{ _id: '1', name: 'mealName', ingredients: [] }];
    const otherOpt = [
      { _id: '2', name: 'Absent', ingredients: [] },
      { _id: '3', name: 'Packed Lunch', ingredients: [] },
    ];

    const combineOpts = component.combineMealOptions(dayMeals, otherOpt);

    expect(combineOpts.map((meal) => meal.name)).toEqual([
      'mealName',
      'Absent',
      'Packed Lunch',
    ]);
  });

  it('should set meal object', () => {
    const meal = { _id: '1', name: 'mealName', ingredients: [] };
    const date = DateTime.fromObject({ year: 2025, month: 5, day: 25 });

    expect(component.setMealObject(meal, date)).toEqual({ meal, date });
  });

  it('should set meal plan entity', () => {
    component.formGroup.patchValue({ start: new Date() });

    const date: Date = component.formGroup.controls['start'].value;
    const mealPlan = {
      monday: { _id: '1', name: 'mealName', ingredients: [] },
      tuesday: { _id: '1', name: 'mealName', ingredients: [] },
      wednesday: { _id: '1', name: 'mealName', ingredients: [] },
      thursday: { _id: '1', name: 'mealName', ingredients: [] },
      friday: { _id: '1', name: 'mealName', ingredients: [] },
    };
    const startDateTime = DateTime.fromISO(date.toISOString())
      .toUTC()
      .startOf('day')
      .plus({ days: 1 });

    let expectedReturn = [
      { _id: '1', name: 'mealName', ingredients: [], date: startDateTime },
      {
        _id: '1',
        name: 'mealName',
        ingredients: [],
        date: startDateTime.plus({ days: 1 }),
      },
      {
        _id: '1',
        name: 'mealName',
        ingredients: [],
        date: startDateTime.plus({ days: 2 }),
      },
      {
        _id: '1',
        name: 'mealName',
        ingredients: [],
        date: startDateTime.plus({ days: 3 }),
      },
      {
        _id: '1',
        name: 'mealName',
        ingredients: [],
        date: startDateTime.plus({ days: 4 }),
      },
    ];

    expect(component.setMealPlanEntity(mealPlan)).toEqual(expectedReturn);
  });

  fit('should remove allergens from meal selection', () => {
    expect(
      component.getMealsLessAllergens(meals, []).map((meal) => meal.name)
    ).toEqual(['Tofu Stir Fry', 'Stir Fry No Allergen']);

    component.data.allergens = [{ _id: '1', name: 'Tofu' }];

    expect(
      component.getMealsLessAllergens(meals, []).map((meal) => meal.name)
    ).toEqual(['Stir Fry No Allergen']);
  });
});

const meals: Meal[] = [
      {
        _id: '1',
        name: 'Tofu Stir Fry',
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
                calories: 0,
                energy: 0,
                fat: 0,
                saturates: 0,
                sugars: 0,
                salt: 0,
              },
            },
          },
        ],
      },
      {
        _id: '2',
        name: 'Stir Fry No Allergen',
        ingredients: [
          {
            amount: 10,
            ingredient: {
              _id: '2',
              name: 'Tomato',
              allergens: [],
              pricePerKG: 1,
              nutrition: {
                calories: 0,
                energy: 0,
                fat: 0,
                saturates: 0,
                sugars: 0,
                salt: 0,
              },
            },
          },
        ],
      },
    ];

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { ChildEditMealComponent } from './edit-meal.component';
import { DateTime } from 'luxon';
import { of } from 'rxjs';
import { Meal } from 'src/app/models/meal';

describe('ChildEditMealComponent', () => {
  let component: ChildEditMealComponent;
  let fixture: ComponentFixture<ChildEditMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildEditMealComponent],
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
    fixture = TestBed.createComponent(ChildEditMealComponent);
    component = fixture.componentInstance;
    component.data.date = DateTime.now();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter out non-meals', () => {
    spyOn(component.mealService, 'getMeals$').and.returnValue(of(meals));

    component.getNotSchoolLunchMeals$().subscribe((val) => {
      expect(val.map((meal) => meal.name)).toEqual([
        'Home for Lunch',
        'Packed Lunch',
        'Absent',
      ]);
    });
  });

  it('should set edit meal object', () => {
    let meal = meals[0];
    expect(
      component.setMealObject(meal, DateTime.fromISO('2025-07-01T00:00:0.0'))
        .name
    ).toEqual('Tofu Stir Fry');

    meal = meals[1];

    expect(
      component.setMealObject(meal, DateTime.fromISO('2025-07-01T00:00:0.0'))
        .name
    ).toEqual('Salad');
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
    name: 'Salad',
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
  {
    _id: '3',
    name: 'Home for Lunch',
    ingredients: [],
  },
  {
    _id: '4',
    name: 'Packed Lunch',
    ingredients: [],
  },
  {
    _id: '5',
    name: 'Absent',
    ingredients: [],
  },
];

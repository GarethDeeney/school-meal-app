import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CreateMealPlanComponent } from './create-meal-plan.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

fdescribe('CreateMealPlanComponent', () => {
  let component: CreateMealPlanComponent;
  let fixture: ComponentFixture<CreateMealPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMealPlanComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(CreateMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should POST a new meal plan', () => {});

  it('should set meal date', () => {
    let mealsControl = new FormControl(mealsObj);
    expect(component.setMealDayValue(mealsControl).name).toEqual('Set Meal C');

    mealsControl.setValue({ ...mealsObj, name: 'New Meal' });
    expect(component.setMealDayValue(mealsControl).name).toEqual('New Meal');
    expect(component.setMealDayValue(mealsControl).meals[0].name).toEqual(
      'Tofu Stir Fry with Vegetables'
    );

    let menuControl = new FormControl(menuObj);
    expect(component.setMealDayValue(menuControl).name).toEqual('Set Meal B');

    menuControl.setValue({
      menu: {
        _id: '1234',
        name: 'New Meal Plan',
        meals: [{ _id: '1234', name: 'New Meal' }],
      },
    });
    expect(component.setMealDayValue(menuControl).name).toEqual(
      'New Meal Plan'
    );
    expect(component.setMealDayValue(menuControl).meals[0].name).toEqual(
      'New Meal'
    );
  });
});

const mealsObj = {
  _id: '68502f1e5a8a6041902fc52c',
  name: 'Set Meal C',
  meals: [
    {
      _id: '685012ac5a8a6041902fc48c',
      name: 'Tofu Stir Fry with Vegetables',
    },
  ],
};

const menuObj = {
  menu: {
    _id: '68502ef95a8a6041902fc529',
    name: 'Set Meal B',
    meals: [
      {
        _id: '6850093744ad944ff1fb6384',
        name: 'Broccoli and Potato Soup',
      },
    ],
  },
};

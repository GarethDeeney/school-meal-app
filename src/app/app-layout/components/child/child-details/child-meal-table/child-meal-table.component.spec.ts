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
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ChildMealTableComponent } from './child-meal-table.component';

fdescribe('ChildMealTableComponent', () => {
  let component: ChildMealTableComponent;
  let fixture: ComponentFixture<ChildMealTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildMealTableComponent],
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
        MatTableModule,
      ],
    });
    fixture = TestBed.createComponent(ChildMealTableComponent);
    component = fixture.componentInstance;
    component.child = {
      _id: '1',
      name: 'Child name',
      allergens: [],
      year: '2',
      meals: [],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get nutritional values per property', () => {
    const ingredients = [
      {
        ingredient: {
          nutrition: {
            calories: 100,
            energy: 100,
            fat: 3,
            salt: 2,
          },
        },
        amount: 10,
      },
      {
        ingredient: {
          nutrition: {
            calories: 100,
            energy: 100,
            fat: 10,
            salt: 4,
          },
        },
        amount: 10,
      },
      {
        ingredient: {
          nutrition: {
            calories: 200,
            energy: 100,
            fat: 2,
            salt: 6,
          },
        },
        amount: 10,
      },
    ];

    expect(component.getNutrtionalVal(ingredients, 'fat')).toEqual(15);
    expect(component.getNutrtionalVal(ingredients, 'salt')).toEqual(12);
  });
});

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MealPlanMealsComponent } from '../meal-plan-meals/meal-plan-meals.component';
import { MealPlanListComponent } from './meal-plan-list.component';

describe('MealPlanListComponent', () => {
  let component: MealPlanListComponent;
  let fixture: ComponentFixture<MealPlanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlanListComponent, MealPlanMealsComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideNativeDateAdapter(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [RouterTestingModule, MatExpansionModule, MatIconModule],
    });
    fixture = TestBed.createComponent(MealPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set date range', () => {
    expect(component.setDateRange('2025-01-11')).toEqual(
      '11-01-2025 - 15-01-2025'
    );
    expect(component.setDateRange('2025-08-08')).toEqual(
      '08-08-2025 - 12-08-2025'
    );
    expect(component.setDateRange('2025-09-01')).toEqual(
      '01-09-2025 - 05-09-2025'
    );
    expect(component.setDateRange('2025-07-31')).toEqual(
      '31-07-2025 - 04-08-2025'
    );
  });

  it('should set reverse date format', () => {
    expect(component.convertDigitIn('2025-07-01')).toEqual('01-07-2025');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { MealHubComponent } from './meal-hub.component';

describe('MealHubComponent', () => {
  let component: MealHubComponent;
  let fixture: ComponentFixture<MealHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealHubComponent, SideNavComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideNativeDateAdapter(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [
        MatSidenavModule,
        MatIconModule,
        MatTableModule,
        RouterTestingModule,
      ],
    });
    fixture = TestBed.createComponent(MealHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check for packed lunch', () => {
    expect(component.checkPackedLunch(meal)).toBeFalse();

    const mockMeal = { ...meal, name: 'Packed Lunch' };
    expect(component.checkPackedLunch(mockMeal)).toBeTrue();
  });

  it('should check for home for lunch', () => {
    expect(component.checkHomeForLunch(meal)).toBeFalse();

    const mockMeal = { ...meal, name: 'Home for Lunch' };
    expect(component.checkHomeForLunch(mockMeal)).toBeTrue();
  });

  it('should check for absent', () => {
    expect(component.checkAbsence(meal)).toBeFalse();

    const mockMeal = { ...meal, name: 'Absent' };
    expect(component.checkAbsence(mockMeal)).toBeTrue();
  });

  let meal = {
    _id: undefined,
    name: 'Meal Name',
    ingredients: [],
  };

  // checkPackedLunch = (meal: Meal) => {
  //   return meal.name == this.PACKED_LUNCH;
  // };

  // checkHomeForLunch = (meal: Meal) => {
  //   return meal.name == this.HOME_FOR_LUNCH;
  // };

  // checkHomeForAbsence = (meal: Meal) => {
  //   return meal.name == this.ABSENT;
  // };
});

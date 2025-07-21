import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AddMealComponent } from './add-meal.component';

describe('AddMealComponent', () => {
  let component: AddMealComponent;
  let fixture: ComponentFixture<AddMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMealComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideAnimations(),
      ],
      imports: [
        MatInputModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatIconModule,
      ],
    });
    fixture = TestBed.createComponent(AddMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get meal values', () => {
    const formGroup = new FormGroup({
      _id: new FormControl('1'),
      name: new FormControl('Meal Name'),
      ingredients: new FormControl([]),
      vegetarian: new FormControl(false),
      vegan: new FormControl(false),
    });

    expect(component.getMealValues(formGroup).name).toEqual('Meal Name');
    expect(component.getMealValues(formGroup)._id).toEqual('1');

    formGroup.patchValue({ _id: undefined, name: 'New Meal Name' });

    expect(component.getMealValues(formGroup).name).toEqual('New Meal Name');
    expect(component.getMealValues(formGroup)._id).toEqual(undefined);
  });

  it('should compare ingredients', () => {
    let ingredient1 = { _id: '1' };
    let ingredient2 = { _id: '2' };
    expect(component.compareIngredients(ingredient1, ingredient2)).toBeFalse();

    ingredient1 = { _id: '2' };
    expect(component.compareIngredients(ingredient1, ingredient2)).toBeTrue();

    ingredient2 = { _id: '1' };
    expect(component.compareIngredients(ingredient1, ingredient2)).toBeFalse();
  });

  it('should call correct submit method', () => {
    const editSpy = spyOn(component, 'editMeal').and.callThrough();
    const addSpy = spyOn(component, 'addMeal').and.callThrough();
    spyOn(component, 'close').and.callFake(() => {});
    spyOn(component, 'getMealValues').and.returnValues(
      { ...meal, vegetarian: true, vegan: false },
      { ...meal, _id: '1', vegetarian: true, vegan: false }
    );

    component.submit();
    expect(addSpy).toHaveBeenCalled();
    expect(editSpy).not.toHaveBeenCalled();

    component.submit();
    expect(editSpy).toHaveBeenCalled();
  });
});

const meal = {
  _id: undefined,
  name: 'Meal Name',
  ingredients: [],
};

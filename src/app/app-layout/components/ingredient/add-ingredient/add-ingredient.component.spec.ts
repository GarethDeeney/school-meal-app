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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AddIngredientComponent } from './add-ingredient.component';

describe('AddIngredientComponent', () => {
  let component: AddIngredientComponent;
  let fixture: ComponentFixture<AddIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIngredientComponent],
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
      ],
    });
    fixture = TestBed.createComponent(AddIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compare allergen ids', () => {
    let allergen1 = { _id: '1' };
    let allergen2 = { _id: '2' };
    expect(component.compareAllergens(allergen1, allergen2)).toBeFalse();

    allergen1 = { _id: '2' };
    expect(component.compareAllergens(allergen1, allergen2)).toBeTrue();

    allergen2 = { _id: '1' };
    expect(component.compareAllergens(allergen1, allergen2)).toBeFalse();
  });

  it('should call correct method when submitting', () => {
    const editSpy = spyOn(component, 'editIngredient').and.callThrough();
    const addSpy = spyOn(component, 'addIngredient').and.callThrough();
    spyOn(component, 'close').and.callFake(() => {});
    spyOn(component, 'getIngredientValues').and.returnValues(ingredient, {
      ...ingredient,
      _id: '1',
    });

    component.submit();
    expect(addSpy).toHaveBeenCalled();
    expect(editSpy).not.toHaveBeenCalled();

    component.submit();
    expect(editSpy).toHaveBeenCalled();
  });

  it('should return ingredient form values', () => {
    const formGroup = new FormGroup({
      _id: new FormControl(),
      name: new FormControl(),
      allergens: new FormControl(),
      nutrition: new FormControl(),
      pricePerKG: new FormControl(),
    });
    // component.formGroup.setValue(ingredient);

    // expect(component.getIngredientValues(component.formGroup).name).toEqual(
    //   'ingredient'
    // );
    component.formGroup.setValue({ ...ingredient, _id: '1', name: 'carrots' });
    expect(component.getIngredientValues(component.formGroup)._id).toEqual('1');
    expect(component.getIngredientValues(component.formGroup).name).toEqual(
      'carrots'
    );
    expect(
      component.getIngredientValues(component.formGroup).allergens.length
    ).toEqual(0);
  });
});

const ingredient = {
  _id: undefined,
  name: 'ingredient',
  allergens: [],
  nutrition: {
    calories: 0,
    energy: 0,
    fat: 0,
    saturates: 0,
    sugars: 0,
    salt: 0,
  },
  pricePerKG: 0,
};

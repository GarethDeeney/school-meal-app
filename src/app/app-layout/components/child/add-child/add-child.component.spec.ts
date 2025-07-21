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
import { AddChildDetailsComponent } from './add-child.component';

describe('AddChildDetailsComponent', () => {
  let component: AddChildDetailsComponent;
  let fixture: ComponentFixture<AddChildDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddChildDetailsComponent],
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
    fixture = TestBed.createComponent(AddChildDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call correct method when submitting', () => {
    const editSpy = spyOn(component, 'editChild').and.callThrough();
    const addSpy = spyOn(component, 'addChild').and.callThrough();
    spyOn(component, 'close').and.callFake(() => {});

    setFormGroupValue(component.formGroup, '1', [], '', []);
    component.submit();

    expect(editSpy).toHaveBeenCalled();
    expect(addSpy).not.toHaveBeenCalled();

    setFormGroupValue(component.formGroup, null, [], '', []);
    component.submit();

    expect(addSpy).toHaveBeenCalled();
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

 it('should get form group values', () => {

    const formGroup = new FormGroup({
      _id: new FormControl(),
      name: new FormControl(),
      allergens: new FormControl(),
      year: new FormControl(),
      meals: new FormControl(),
    });

    let expectedReturn: any = {
      _id: null,
      name: null,
      allergens: null,
      year: null,
      meals: [],
    };
    expect(component.getChildValues(formGroup)).toEqual(expectedReturn);

    expectedReturn = {
      _id: '1',
      name: 'name',
      allergens: [],
      year: '2',
      meals: [],
    }

    formGroup.setValue(expectedReturn);
    expect(component.getChildValues(formGroup)).toEqual(expectedReturn);
  });
});

const setFormGroupValue = (
  fg: FormGroup,
  id: string | null,
  allergens: any[],
  year: string,
  meals: any[]
) => {
  fg.setValue({
    _id: id,
    name: name,
    allergens: allergens,
    year: year,
  });

  return fg;
};

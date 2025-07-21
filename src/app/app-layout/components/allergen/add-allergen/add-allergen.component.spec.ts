import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AddAllergenComponent } from './add-allergen.component';

describe('AddAllergenComponent', () => {
  let component: AddAllergenComponent;
  let fixture: ComponentFixture<AddAllergenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAllergenComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: MatDialogRef, useValue: {} },
        provideAnimations(),
      ],
      imports: [MatInputModule, ReactiveFormsModule, MatDialogModule],
    });
    fixture = TestBed.createComponent(AddAllergenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get formGroup values', () => {
    setFormGroupValue(component.formGroup, null, 'allergen', '', '');
    let expectedReturn = {
      _id: null,
      name: 'allergen',
      specialRequirements: '',
      reaction: '',
    };

    expect(component.getAllergenValues(component.formGroup)).toEqual(
      expectedReturn
    );

    setFormGroupValue(
      component.formGroup,
      null,
      'name',
      'specialRequirements',
      'reaction'
    );

    expectedReturn = {
      _id: null,
      name: 'name',
      specialRequirements: 'specialRequirements',
      reaction: 'reaction',
    };

    expect(component.getAllergenValues(component.formGroup)).toEqual(
      expectedReturn
    );
  });

  it('should call correct method when submitting', () => {
    const editSpy = spyOn(component, 'editAllergen').and.callThrough();
    const addSpy = spyOn(component, 'addAllergen').and.callThrough();
    spyOn(component, 'close').and.callFake(() => {});

    setFormGroupValue(component.formGroup, '1', 'allergen', '', '');
    component.submit();

    expect(editSpy).toHaveBeenCalled();
    expect(addSpy).not.toHaveBeenCalled();

    setFormGroupValue(component.formGroup, null, 'allergen', '', '');
    component.submit();

    expect(addSpy).toHaveBeenCalled();
  });
});

const setFormGroupValue = (
  fg: FormGroup,
  id: string | null,
  name: string,
  specialRequirement: string,
  reaction: string
) => {
  fg.setValue({
    _id: id,
    name: name,
    specialRequirements: specialRequirement,
    reaction: reaction,
  });

  return fg;
};

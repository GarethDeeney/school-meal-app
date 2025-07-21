import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AddMenuComponent } from './add-menu.component';

describe('AddMenuComponent', () => {
  let component: AddMenuComponent;
  let fixture: ComponentFixture<AddMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMenuComponent],
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
        MatIconModule,
      ],
    });
    fixture = TestBed.createComponent(AddMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compare meals ids', () => {
    let meal1 = { _id: '1' };
    let meal2 = { _id: '2' };
    expect(component.compareMeals(meal1, meal2)).toBeFalse();

    meal1 = { _id: '2' };
    expect(component.compareMeals(meal1, meal2)).toBeTrue();

    meal2 = { _id: '1' };
    expect(component.compareMeals(meal1, meal2)).toBeFalse();
  });

  it('should call correct submit method', () => {
    const editSpy = spyOn(component, 'editMenu').and.callThrough();
    const addSpy = spyOn(component, 'addMenu').and.callThrough();
    spyOn(component, 'close').and.callFake(() => {});
    spyOn(component, 'getMealValues').and.returnValues(
      { _id: null, name: 'Menu Name', meals: [] },
      { _id: '1', name: 'Menu Name', meals: [] }
    );

    component.submit();
    expect(addSpy).toHaveBeenCalled();
    expect(editSpy).not.toHaveBeenCalled();

    component.submit();
    expect(editSpy).toHaveBeenCalled();
  });

  it('should get meal values from form group', () => {
    const formGroup = new FormGroup({
      _id: new FormControl('1'),
      name: new FormControl('Menu Name'),
      meals: new FormControl([]),
    });

    const fgValues = component.getMealValues(formGroup);

    expect(fgValues._id).toEqual('1');
    expect(fgValues.name).toEqual('Menu Name');
    expect(fgValues.meals.length).toEqual(0);
  });
});

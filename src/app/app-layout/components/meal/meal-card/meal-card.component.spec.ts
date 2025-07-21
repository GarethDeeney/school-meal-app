import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealCardComponent } from './meal-card.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MealCardInfoComponent } from '../meal-card-info/meal-card-info.component';

describe('MealCardComponent', () => {
  let component: MealCardComponent;
  let fixture: ComponentFixture<MealCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealCardComponent, MealCardInfoComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
      ],
      imports: [ReactiveFormsModule, MatIconModule, MatExpansionModule],
    });
    fixture = TestBed.createComponent(MealCardComponent);
    component = fixture.componentInstance;

    component.meal = {
      _id: '1',
      name: 'Meal Name',
      ingredients: [],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

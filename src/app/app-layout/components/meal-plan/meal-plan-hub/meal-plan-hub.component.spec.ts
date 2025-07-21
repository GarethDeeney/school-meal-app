import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { MealPlanHubComponent } from './meal-plan-hub.component';
import { MealPlanListComponent } from '../meal-plan-list/meal-plan-list.component';

describe('MealPlanHubComponent', () => {
  let component: MealPlanHubComponent;
  let fixture: ComponentFixture<MealPlanHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlanHubComponent, SideNavComponent, MealPlanListComponent],
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
    fixture = TestBed.createComponent(MealPlanHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { IngredientHubComponent } from './ingredient-hub.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('IngredientHubComponent', () => {
  let component: IngredientHubComponent;
  let fixture: ComponentFixture<IngredientHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientHubComponent, SideNavComponent],
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
    fixture = TestBed.createComponent(IngredientHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

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
import { AllergenHubComponent } from './allergen-hub.component';
import { AllergenService } from '../allergenService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AllergenHubComponent', () => {
  let component: AllergenHubComponent;
  let fixture: ComponentFixture<AllergenHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergenHubComponent, SideNavComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideNativeDateAdapter(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        AllergenService,
      ],
      imports: [
        MatSidenavModule,
        MatIconModule,
        MatTableModule,
        RouterTestingModule,
      ],
    });
    fixture = TestBed.createComponent(AllergenHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ComponentModule } from 'src/app/app-layout/components/components.module';

describe('AddCourseProviderDialogComponent', () => {
  let component: AddCourseProviderDialogComponent;
  let fixture: ComponentFixture<AddCourseProviderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourseProviderDialogComponent],
      providers: [
        HttpClient,
        HttpHandler,
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ComponentModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
    });
    fixture = TestBed.createComponent(AddCourseProviderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

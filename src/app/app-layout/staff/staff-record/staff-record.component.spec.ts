import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material-module';
import { ComponentModule } from '../../components/components.module';
import { StaffRecordComponent } from './staff-record.component';

describe('StaffRecordComponent', () => {
  let component: StaffRecordComponent;
  let fixture: ComponentFixture<StaffRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffRecordComponent],
      providers: [HttpClient, HttpHandler],
      imports: [
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ComponentModule,
        MatDialogModule,
      ],
    });
    fixture = TestBed.createComponent(StaffRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

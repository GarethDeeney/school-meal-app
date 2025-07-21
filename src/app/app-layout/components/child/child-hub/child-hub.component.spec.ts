import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ChildHubComponent } from './child-hub.component';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { MatTableModule } from '@angular/material/table';

describe('ChildHubComponent', () => {
  let component: ChildHubComponent;
  let fixture: ComponentFixture<ChildHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildHubComponent, SideNavComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideNativeDateAdapter(),
      ],
      imports: [
        MatSidenavModule,
        MatIconModule,
        MatTableModule,
        RouterTestingModule
      ],
    });
    fixture = TestBed.createComponent(ChildHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

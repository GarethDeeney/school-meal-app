import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHubComponent } from './menu-hub.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavComponent } from '../../side-nav/side-nav.component';

describe('MenuHubComponent', () => {
  let component: MenuHubComponent;
  let fixture: ComponentFixture<MenuHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuHubComponent, SideNavComponent],
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
        RouterTestingModule,
      ],
    });
    fixture = TestBed.createComponent(MenuHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

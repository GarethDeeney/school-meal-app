import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  providers: [HttpService],
})
export class SideNavComponent {

  constructor(private router: Router, private http: HttpService) {}

  supportRoutes = [
    {
      label: 'Settings',
      url: '/settings',
      icon: 'settings',
      execute: (): void => {},
    },
    {
      label: 'Support',
      url: '/support',
      icon: 'contact_support',
      execute: (): void => {},
    },
    {
      label: 'Log Out',
      url: '/log-out',
      icon: 'logout',
      execute: (): void => {
        this.logOut();
      },
    },
  ];

  routes = [
    {
      label: 'Home',
      url: '/dashboard',
      icon: 'home_outline',
      execute: (): void => {},
    },
    {
      label: 'Course List',
      url: `/courses-hub`,
      icon: 'work',
      execute: (): void => {},
    },
    {
      label: 'Staff Details',
      url: '/staff-hub',
      icon: 'account_box',
      execute: (): void => {},
    },
    ...this.supportRoutes,
  ];


  navigate = (url: string) => {
    this.router.navigateByUrl(url);
  };

  logOut = () => {
    localStorage.clear();
    this.navigate('/');
  };
}

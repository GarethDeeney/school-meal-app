import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  providers: [HttpService],
  standalone: false,
})
export class SideNavComponent {
  constructor(private router: Router, private http: HttpService) {}

  routes = [
    {
      label: 'Home',
      url: '/dashboard',
      icon: 'home_outline',
      execute: (): void => {},
    },
    {
      label: 'Allergens',
      url: '/allergen/hub',
      icon: 'account_box',
      execute: (): void => {},
    },
    {
      label: 'Child',
      url: `/child/hub`,
      icon: 'work',
      execute: (): void => {},
    },
    {
      label: 'Ingredients',
      url: '/ingredient/hub',
      icon: 'account_box',
      execute: (): void => {},
    },
    {
      label: 'Meal Plans',
      url: '/meal-plan/hub',
      icon: 'account_box',
      execute: (): void => {},
    },
    {
      label: 'Meals',
      url: '/meal/hub',
      icon: 'account_box',
      execute: (): void => {},
    },
    {
      label: 'Menus',
      url: '/menu/hub',
      icon: 'account_box',
      execute: (): void => {},
    },
    {
      label: 'Reports',
      url: '/reports',
      icon: 'analytics',
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

  navigate = (url: string) => {
    this.router.navigateByUrl(url);
  };

  logOut = () => {
    localStorage.clear();
    this.navigate('/');
  };
}

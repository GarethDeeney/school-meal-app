import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Menu } from 'src/app/models/menu';
import { MenuService } from '../menu-service';
import { AddMenuComponent } from '../add-menu/add-menu.component';

@Component({
  selector: 'app-menu-hub',
  templateUrl: './menu-hub.component.html',
  styleUrls: ['./menu-hub.component.scss'],
  standalone: false,
})
export class MenuHubComponent implements OnInit {
  menus$ = new BehaviorSubject<Menu[]>([]);

  constructor(
    protected menuService: MenuService,
    protected router: Router,
    protected dialog: MatDialog
  ) {
    this.menuService.getMenus$().subscribe((menus) => {
      this.menus$.next(menus);
    });
    this.menuService.menus$.subscribe(console.log);
  }

  openMenuDialog() {
    this.menuService.formGroup = this.menuService.setupFormGroup();
    this.dialog.open(AddMenuComponent, {
      maxHeight: '100%',
      width: '300px',
    });
  }

  ngOnInit(): void {
    this.menuService.menus$.subscribe(console.log);
  }
}

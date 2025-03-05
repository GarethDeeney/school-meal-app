import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllergenDetailsComponent } from './app-layout/components/allergen/allergen-details/allergen-details.component';
import { AllergenHubComponent } from './app-layout/components/allergen/allergen-hub/allergen-hub.component';
import { ChildDetailsComponent } from './app-layout/components/child/child-details/child-details.component';
import { ChildHubComponent } from './app-layout/components/child/child-hub/child-hub.component';
import { IngredientDetailsComponent } from './app-layout/components/ingredient/ingredient-details/ingredient-details.component';
import { IngredientHubComponent } from './app-layout/components/ingredient/ingredient-hub/ingredient-hub.component';
import { MenuDetailsComponent } from './app-layout/components/menu/menu-details/menu-details.component';
import { MenuHubComponent } from './app-layout/components/menu/menu-hub/menu-hub.component';
import { DashboardComponent } from './app-layout/dashboard/dashboard.component';
import { LogInComponent } from './app-layout/log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'child',
    children: [
      {
        path: 'hub',
        component: ChildHubComponent,
      },
      {
        path: ':_id',
        component: ChildDetailsComponent,
      },
    ],
  },
  {
    path: 'menu/hub',
    component: MenuHubComponent,
    children: [
      {
        path: ':menuId',
        component: MenuDetailsComponent,
      },
    ],
  },
  {
    path: 'ingredient/hub',
    component: IngredientHubComponent,
    children: [
      {
        path: ':ingredientId',
        component: IngredientDetailsComponent,
      },
    ],
  },
  {
    path: 'allergen',
    children: [
      {
        path: 'hub',
        component: AllergenHubComponent,
      },
      {
        path: ':_id',
        component: AllergenDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

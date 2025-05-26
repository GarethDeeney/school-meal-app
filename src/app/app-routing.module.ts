import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllergenHubComponent } from './app-layout/components/allergen/allergen-hub/allergen-hub.component';
import { ChildDetailsComponent } from './app-layout/components/child/child-details/child-details.component';
import { ChildHubComponent } from './app-layout/components/child/child-hub/child-hub.component';
import { IngredientHubComponent } from './app-layout/components/ingredient/ingredient-hub/ingredient-hub.component';
import { MenuHubComponent } from './app-layout/components/menu/menu-hub/menu-hub.component';
import { DashboardComponent } from './app-layout/dashboard/dashboard.component';
import { LogInComponent } from './app-layout/log-in/log-in.component';
import { MealHubComponent } from './app-layout/components/meal/meal-hub/meal-hub.component';
import { MealPlanHubComponent } from './app-layout/components/meal-plan/meal-plan-hub/meal-plan-hub.component';

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
    path: 'meal/hub',
    component: MealHubComponent,
  },
  {
    path: 'meal-plan/hub',
    component: MealPlanHubComponent,
  },
  {
    path: 'menu/hub',
    component: MenuHubComponent,
  },
  {
    path: 'ingredient/hub',
    component: IngredientHubComponent,
  },
  {
    path: 'allergen/hub',
    component: AllergenHubComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

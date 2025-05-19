import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { HttpService } from 'src/app/services/http.service';
import { AddAllergenComponent } from './allergen/add-allergen/add-allergen.component';
import { AllergenHubComponent } from './allergen/allergen-hub/allergen-hub.component';
import { AddChildDetailsComponent } from './child/add-child/add-child.component';
import { ChildDetailsComponent } from './child/child-details/child-details.component';
import { ChildMealTableComponent } from './child/child-details/child-meal-table/child-meal-table.component';
import { NutritionGroupComponent } from './child/child-details/nutrition-group/nutrition-group.component';
import { ChildHubComponent } from './child/child-hub/child-hub.component';
import { AddIngredientComponent } from './ingredient/add-ingredient/add-ingredient.component';
import { IngredientHubComponent } from './ingredient/ingredient-hub/ingredient-hub.component';
import { AddMealComponent } from './meal/add-meal/add-meal.component';
import { MealCardInfoComponent } from './meal/meal-card-info/meal-card-info.component';
import { MealCardComponent } from './meal/meal-card/meal-card.component';
import { MealHubComponent } from './meal/meal-hub/meal-hub.component';
import { AddMenuComponent } from './menu/add-menu/add-menu.component';
import { MenuCardComponent } from './menu/menu-card/menu-card.component';
import { MenuHubComponent } from './menu/menu-hub/menu-hub.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [
    MealCardInfoComponent,
    AddMenuComponent,
    SideNavComponent,
    ChildHubComponent,
    ChildDetailsComponent,
    MenuCardComponent,
    MenuHubComponent,
    IngredientHubComponent,
    AllergenHubComponent,
    AddChildDetailsComponent,
    AddAllergenComponent,
    AddIngredientComponent,
    MealHubComponent,
    MealCardComponent,
    AddMealComponent,
    ChildMealTableComponent,
    NutritionGroupComponent,
  ],
  imports: [
    RouterModule,
    MaterialModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService],
  exports: [SideNavComponent],
})
export class ComponentModule {}

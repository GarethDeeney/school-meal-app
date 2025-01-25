import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from 'src/app/material-module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { ChildHubComponent } from './child/child-hub/child-hub.component';
import { ChildDetailsComponent } from './child/child-details/child-details.component';
import { MenuDetailsComponent } from './menu/menu-details/menu-details.component';
import { MenuHubComponent } from './menu/menu-hub/menu-hub.component';
import { IngredientHubComponent } from './ingredient/ingredient-hub/ingredient-hub.component';
import { IngredientDetailsComponent } from './ingredient/ingredient-details/ingredient-details.component';
import { AllergenHubComponent } from './allergen/allergen-hub/allergen-hub.component';
import { AllergenDetailsComponent } from './allergen/allergen-details/allergen-details.component';

@NgModule({
  declarations: [SideNavComponent, ChildHubComponent, ChildDetailsComponent, MenuDetailsComponent, MenuHubComponent, IngredientHubComponent, IngredientDetailsComponent, AllergenHubComponent, AllergenDetailsComponent],
  imports: [RouterModule, MaterialModule, BrowserModule, CommonModule],
  providers: [HttpService],
  exports: [SideNavComponent],
})
export class ComponentModule {}

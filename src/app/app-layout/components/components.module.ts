import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { HttpService } from 'src/app/services/http.service';
import { AllergenDetailsComponent } from './allergen/allergen-details/allergen-details.component';
import { AllergenHubComponent } from './allergen/allergen-hub/allergen-hub.component';
import { AddChildDetailsComponent } from './child/add-child/add-child.component';
import { ChildDetailsComponent } from './child/child-details/child-details.component';
import { ChildHubComponent } from './child/child-hub/child-hub.component';
import { IngredientDetailsComponent } from './ingredient/ingredient-details/ingredient-details.component';
import { IngredientHubComponent } from './ingredient/ingredient-hub/ingredient-hub.component';
import { MenuDetailsComponent } from './menu/menu-details/menu-details.component';
import { MenuHubComponent } from './menu/menu-hub/menu-hub.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [
    SideNavComponent,
    ChildHubComponent,
    ChildDetailsComponent,
    MenuDetailsComponent,
    MenuHubComponent,
    IngredientHubComponent,
    IngredientDetailsComponent,
    AllergenHubComponent,
    AllergenDetailsComponent,
    AddChildDetailsComponent,
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

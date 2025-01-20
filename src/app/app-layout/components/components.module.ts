import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from 'src/app/material-module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';

@NgModule({
  declarations: [SideNavComponent],
  imports: [RouterModule, MaterialModule, BrowserModule, CommonModule],
  providers: [HttpService],
  exports: [SideNavComponent],
})
export class ComponentModule {}

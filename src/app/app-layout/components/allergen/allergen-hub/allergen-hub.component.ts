import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Child } from 'src/app/models/child';
import { AddChildDetailsComponent } from '../../child/add-child/add-child.component';
import { ChildService } from '../../child/child-hub.service';
import { Router } from '@angular/router';
import { AllergenService } from '../allergenService';
import { Allergen } from 'src/app/models/allergen';
import { AddAllergenComponent } from '../add-allergen/add-allergen.component';

@Component({
  selector: 'app-allergen-hub',
  templateUrl: './allergen-hub.component.html',
  styleUrls: ['./allergen-hub.component.scss'],
  standalone: false,
})
export class AllergenHubComponent {
  displayedColumns: string[] = ['name', 'reaction', 'specialRequirements', 'actions'];

  constructor(
    protected allergenService: AllergenService,
    protected router: Router,
    public dialogRef: MatDialogRef<AddAllergenComponent>,
    protected dialog: MatDialog
  ) {
    this.allergenService.getAllergens$();
  }

  openAddAllergenDialog() {
    this.dialog.open(AddAllergenComponent, {
      height: '325px',
      width: '500px',
    });
  }

  navigateByToAllergenDetails = (child: Allergen) => {
    this.router.navigateByUrl(`/allergen/${child._id}`);
  };
}

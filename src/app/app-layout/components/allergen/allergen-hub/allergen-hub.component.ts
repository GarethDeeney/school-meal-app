import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Allergen } from 'src/app/models/allergen';
import { AddAllergenComponent } from '../add-allergen/add-allergen.component';
import { AllergenService } from '../allergenService';
import { SnackbarService } from '../../snackbar-service';

@Component({
  selector: 'app-allergen-hub',
  templateUrl: './allergen-hub.component.html',
  styleUrls: ['./allergen-hub.component.scss'],
  standalone: false,
})
export class AllergenHubComponent {
  displayedColumns: string[] = [
    'name',
    'reaction',
    'specialRequirements',
    'actions',
  ];

  constructor(
    protected allergenService: AllergenService,
    protected router: Router,
    public dialogRef: MatDialogRef<AddAllergenComponent>,
    protected dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    this.allergenService.setDataSource();
  }

  openAddAllergenDialog() {
    this.allergenService.formGroup.reset();

    this.dialog.open(AddAllergenComponent, {
      height: '325px',
      width: '500px',
    });
  }

  openEditDialog(allergen: Allergen) {
    this.allergenService.formGroup.setValue({
      _id: allergen._id,
      name: allergen.name,
      reaction: allergen.reaction,
      specialRequirements: allergen.specialRequirements,
    });

    this.dialog.open(AddAllergenComponent, {
      height: '325px',
      width: '500px',
    });
  }

  navigateByToAllergenDetails = (allergen: Allergen) => {
    this.router.navigateByUrl(`/allergen/${allergen._id}`);
  };

  deleteAllergen(id: string) {
    return this.allergenService.deleteAllergen$(id).subscribe({
      complete: () => {
        this.allergenService.setDataSource();
        this.snackbarService.openSnackBar('Allergen Deleted Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}

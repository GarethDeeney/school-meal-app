import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { AddChildDetailsComponent } from '../add-child/add-child.component';
import { ChildService } from '../child-hub.service';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from '../../snackbar-service';

@Component({
  selector: 'app-child-hub',
  templateUrl: './child-hub.component.html',
  styleUrls: ['./child-hub.component.scss'],
  standalone: false,
})
export class ChildHubComponent {
  displayedColumns: string[] = ['name', 'year', 'actions'];

  constructor(
    protected childService: ChildService,
    protected router: Router,
    protected dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    this.childService.getChildren$();
  }

  openAddChildDialog() {
    this.childService.formGroup.reset();

    this.dialog.open(AddChildDetailsComponent, {
      height: '325px',
      width: '500px',
    });
  }

  navigateByToChildDetails = (child: Child) => {
    this.router.navigateByUrl(`/child/${child._id}`);
  };

  openEditDialog(child: Child) {
    this.childService.formGroup.setValue({
      _id: child._id,
      name: child.name,
      year: child.year,
      allergens: child.allergens,
    });

    this.dialog.open(AddChildDetailsComponent, {
      height: '325px',
      width: '500px',
      data: { meals: child.meals },
    });
  }

  deleteChild(id: string) {
    return this.childService.deleteChild$(id).subscribe({
      complete: () => {
        this.childService.getChildren$();
        this.snackbarService.openSnackBar('Child Deleted Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}

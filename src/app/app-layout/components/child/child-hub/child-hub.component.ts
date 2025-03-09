import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { AddChildDetailsComponent } from '../add-child/add-child.component';
import { ChildService } from '../child-hub.service';
import { FormControl, Validators } from '@angular/forms';

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
    public dialogRef: MatDialogRef<AddChildDetailsComponent>,
    protected dialog: MatDialog
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
    console.log(child);
    this.childService.formGroup.setValue({
      _id: child._id,
      name: child.name,
      year: child.year,
      allergens: child.allergens,
    });

    this.dialog.open(AddChildDetailsComponent, {
      height: '325px',
      width: '500px',
    });
  }

  deleteChild(id: string) {
    return this.childService.deleteChild$(id).subscribe({
      complete: () => this.childService.getChildren$(),
      error: (err) => {
        console.log(err);
      },
    });
  }
}

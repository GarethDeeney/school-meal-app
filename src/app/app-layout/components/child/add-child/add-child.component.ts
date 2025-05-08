import { Component } from '@angular/core';
import { ChildService } from '../child-hub.service';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Allergen } from 'src/app/models/allergen';
import { AllergenService } from '../../allergen/allergenService';
import { SnackbarService } from '../../snackbar-service';

@Component({
  selector: 'app-add-child-details',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss'],
  standalone: false,
})
export class AddChildDetailsComponent {
  constructor(
    protected childService: ChildService,
    public dialogRef: MatDialogRef<AddChildDetailsComponent>,
    protected allergenService: AllergenService,
    private snackbarService: SnackbarService
  ) {}

  allergens$ = this.allergenService.getAllergens$();

  compareAllergens = (a: any, b: any) => a.id == b.id;

  getChildValues(fg: FormGroup): Child {
    return {
      _id: fg.controls['_id'].value,
      name: fg.controls['name'].value,
      allergens: fg.controls['allergens'].value,
      year: fg.controls['year'].value,
      meals: <any>[],
    };
  }

  formGroup: FormGroup = this.childService.formGroup;

  close() {
    this.dialogRef.close();
  }

  submit() {
    const child = this.getChildValues(this.formGroup);
    this.dialogRef.close();
    return child._id ? this.editChild(child) : this.addChild(child);
  }

  addChild(child: Child) {
    return this.childService.addChild$(child).subscribe({
      complete: () => {
        this.childService.getChildren$();
        this.snackbarService.openSnackBar('Child Created Successfully');
      },
      error: (err) => console.log(err),
    });
  }

  editChild(child: Child) {
    return this.childService.updateChild$(child).subscribe({
      complete: () => {
        this.childService.getChildren$();
        this.snackbarService.openSnackBar('Child Updated Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AllergenService } from '../allergenService';
import { Allergen } from 'src/app/models/allergen';

@Component({
  selector: 'app-add-allergen-details',
  templateUrl: './add-allergen.component.html',
  styleUrls: ['./add-allergen.component.scss'],
  standalone: false,
})
export class AddAllergenComponent {
  constructor(
    protected allergenService: AllergenService,
    public dialogRef: MatDialogRef<AddAllergenComponent>
  ) {}

  getAllergenValues(fg: FormGroup) {
    return {
      _id: fg.controls['_id'].value,
      name: fg.controls['name'].value,
      reaction: fg.controls['reaction'].value,
      specialRequirements: fg.controls['specialRequirements'].value,
    };
  }

  formGroup = this.allergenService.formGroup;

  close() {
    this.dialogRef.close();
  }

  submit() {
    const allergen = this.getAllergenValues(this.formGroup);
    this.dialogRef.close();
    return allergen._id ? this.editChild(allergen) : this.addChild(allergen);
  }

  addChild(allergen: Allergen) {
    return this.allergenService.addAllergen$(allergen).subscribe({
      complete: () => this.allergenService.getAllergens$(),
      error: (err) => console.log(err),
    });
  }

  editChild(allergen: Allergen) {
    return this.allergenService.updateAllergen$(allergen).subscribe({
      complete: () => this.allergenService.getAllergens$(),
      error: (err) => console.log(err),
    });
  }
}

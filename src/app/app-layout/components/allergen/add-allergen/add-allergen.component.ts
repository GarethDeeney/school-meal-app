import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AllergenService } from '../allergenService';

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

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    reaction: new FormControl('', Validators.required),
    specialRequirements: new FormControl(''),
  });

  getAllergenValues(fg: FormGroup) {
    return {
      name: fg.controls['name'].value,
      reaction: fg.controls['reaction'].value,
      specialRequirements: fg.controls['reaction'].value,
    };
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    const allergen = this.getAllergenValues(this.formGroup);
    this.dialogRef.close();
    return this.allergenService.addAllergen$(allergen).subscribe({
      complete: () => this.allergenService.getAllergens$(),
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

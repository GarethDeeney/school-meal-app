import { Component } from '@angular/core';
import { ChildService } from '../child-hub.service';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-child-details',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss'],
  standalone: false,
})
export class AddChildDetailsComponent {
  constructor(
    protected childService: ChildService,
    public dialogRef: MatDialogRef<AddChildDetailsComponent>
  ) {}

  formGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    allergies: new FormControl(null, Validators.required),
    year: new FormControl(null),
  });

  getChildValues(fg: FormGroup) {
    return {
      name: fg.controls['name'].value,
      allergies: <any>[],
      year: fg.controls['year'].value,
      meals: <any>[],
    };
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    const child = this.getChildValues(this.formGroup);
    this.dialogRef.close();
    return this.childService.addChild$(child).subscribe({
      complete: () => this.childService.getChildren$(),
      error: (err) => {
        console.log(err);
      },
    });
  }
}

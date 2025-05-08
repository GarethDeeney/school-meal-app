import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', { duration: 2000 });
  }
}

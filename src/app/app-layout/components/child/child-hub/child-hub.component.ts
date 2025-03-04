import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { AddChildDetailsComponent } from '../add-child/add-child.component';
import { ChildService } from '../child-hub.service';

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
    this.childService.getChildren$()
  }

  openAddChildDialog() {
    this.dialog.open(AddChildDetailsComponent, {
      height: '325px',
      width: '500px',
    });
  }

  navigateByToChildDetails = (child: Child) => {
    this.router.navigateByUrl(`/child/${child._id}`);
  };
}

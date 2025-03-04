import { Component, OnInit } from '@angular/core';
import { ChildService } from '../child-hub.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss'],
  standalone: false,
})
export class ChildDetailsComponent implements OnInit {
  idParam!: string;
  child$!: Observable<Child>;
  constructor(
    protected childService: ChildService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.idParam = params['_id'];
    });
  }

  ngOnInit(): void {
    this.child$ = this.childService.getChildInfo$(this.idParam);
  }
}

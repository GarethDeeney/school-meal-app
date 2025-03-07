import { Component } from '@angular/core';
import { AllergenService } from '../allergenService';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Allergen } from 'src/app/models/allergen';

@Component({
  selector: 'app-allergen-details',
  templateUrl: './allergen-details.component.html',
  styleUrls: ['./allergen-details.component.scss'],
  standalone: false,
})
export class AllergenDetailsComponent {
  idParam!: string;
  allergen$!: Observable<Allergen>;
  constructor(
    protected allergenService: AllergenService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.idParam = params['_id'];
    });
  }

  ngOnInit(): void {
    this.allergen$ = this.allergenService.getAllergenInfo$(this.idParam);
  }
}

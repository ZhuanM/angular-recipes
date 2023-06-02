import { Component, EventEmitter, Input, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base.component';
import { AppState } from '../models/app-state.interface';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent extends BaseComponent {
  @Input() recipe: any; // TODO replace with the type of your recipe
  @Output() toggleFavorite = new EventEmitter<boolean>();
  
  constructor(private store: Store<AppState>) { 
    super();
  }

  public onClickHeart() {
    this.recipe.isFavorite = !this.recipe.isFavorite;
    this.toggleFavorite.emit(this.recipe);
  }
}

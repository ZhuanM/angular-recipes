import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { Recipe } from '../models/recipe.interface';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  @Input() recipe: Recipe;
  @Output() toggleFavorite = new EventEmitter<{recipe: any, isFavorited: boolean}>();
  public isFavorited: boolean;
  
  constructor(private store: Store<AppState>) { }

  public onClickHeart() {
    this.isFavorited = !this.isFavorited;
    this.toggleFavorite.emit({ recipe: this.recipe, isFavorited: this.isFavorited });
  }
}

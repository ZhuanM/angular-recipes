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
  @Output() onOpenRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  
  constructor(private store: Store<AppState>) { }

  public openRecipe() {
    this.onOpenRecipe.emit(this.recipe);
  }

  public onClickHeart(event: any) {
    let updatedRecipe = { ...this.recipe, isFavorite: !this.recipe.isFavorite };
    this.recipe = updatedRecipe;

    this.toggleFavorite.emit({ recipe: this.recipe, isFavorited: this.recipe.isFavorite });
  }
}

import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import { appLoading } from '../shared/loader/store/loader.actions';
import { Recipe } from '../shared/models/recipe.interface';
import { Router } from '@angular/router';
import * as FavoritesSelectors from '../favorites/store/favorites.selectors';
import * as FavoritesActions from '../favorites/store/favorites.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent extends BaseComponent {
  readonly favoritedRecipes$: Observable<Array<Recipe>> = this.store.pipe(select(FavoritesSelectors.favoritedRecipes), takeUntil(this.destroyed$));

  public recipes: Array<Recipe> = [];

  constructor(private store: Store<AppState>, private router: Router) { 
    super();

    this.favoritedRecipes$.pipe(takeUntil(this.destroyed$)).subscribe(favoritedRecipes => {
      if (favoritedRecipes) {
        const recipesWithTags = favoritedRecipes.map(recipe => {
          if (!recipe.hasOwnProperty('tags')) {
            const tags: Array<string> = [];
    
            if (recipe.vegetarian) tags.push('Vegetarian');
            if (recipe.vegan) tags.push('Vegan');
            if (recipe.glutenFree) tags.push('Gluten Free');
            if (recipe.dairyFree) tags.push('Dairy Free');
    
            return { ...recipe, tags }; // return the recipe with added tags property
          }
    
          // If tags property exists, return the recipe as it is
          return recipe;
        });
    
        this.recipes = [...this.recipes, ...recipesWithTags];
      }
    });
  }

  ngOnInit() {
    this.loadMore();
  }

  private loadMore() {
    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(FavoritesActions.getFavoritedRecipes());
  }

  public openRecipe(recipe: Recipe) {
    this.router.navigate(
      ['/recipe', recipe.id],
      { queryParams: { isFavorite: true } }
    );
  }

  public onToggleFavorite({recipe, isFavorited}: {recipe: Recipe, isFavorited: boolean}) {
    this.store.dispatch(appLoading({ loading: true }));
    if (isFavorited) {
      this.store.dispatch(FavoritesActions.addToFavorites({ recipe: recipe }));
    } else {
      this.store.dispatch(FavoritesActions.removeFromFavorites({ id: recipe.id }));
    }
  }
}

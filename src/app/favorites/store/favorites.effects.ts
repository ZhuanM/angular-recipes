import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as FavoritesActions from './favorites.actions';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) {}

  getFavoritedRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.getFavoritedRecipes),
      switchMap((action) => {
        return this.recipeService.getFavoritedRecipes().pipe(
          map((response) => {
            // Map each recipe to include 'isFavorite' property
            const recipes = response.map((recipe: any) => ({
              ...recipe,
              isFavorite: true,
            }));

            return FavoritesActions.getFavoritedRecipesSuccess({
              favoritedRecipes: recipes
            });
          })
        );
      })
    )
  );

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.addToFavorites),
      switchMap((action) => {
        return this.recipeService.addToFavorites(action.recipe).pipe(
          map((response) => {
            return FavoritesActions.addToFavoritesSuccess();
          })
        );
      })
    )
  );

  removeFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.removeFromFavorites),
      switchMap((action) => {
        return this.recipeService.removeFromFavorites(action.id).pipe(
          map((response) => {
            return FavoritesActions.removeFromFavoritesSuccess();
          })
        );
      })
    )
  );
}

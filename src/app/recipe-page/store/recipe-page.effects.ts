import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as RecipePageActions from './recipe-page.actions';
import { RecipeService } from 'src/app/shared/services/recipe-page.service';

@Injectable()
export class RecipePageEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) {}

  getRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipePageActions.getRecipe),
      switchMap((action) => {
        return this.recipeService.getRecipe(action.id).pipe(
          map((response) => {
            if (!response.hasOwnProperty('isFavorite')) {
              response.isFavorite = false;
            }
            return RecipePageActions.getRecipeSuccess({
              recipe: response
            });
          })
        );
      })
    )
  );

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipePageActions.addToFavorites),
      switchMap((action) => {
        return this.recipeService.addToFavorites(action.recipe).pipe(
          map((response) => {
            return RecipePageActions.addToFavoritesSuccess();
          })
        );
      })
    )
  );

  removeFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipePageActions.removeFromFavorites),
      switchMap((action) => {
        return this.recipeService.removeFromFavorites(action.id).pipe(
          map((response) => {
            return RecipePageActions.removeFromFavoritesSuccess();
          })
        );
      })
    )
  );
}

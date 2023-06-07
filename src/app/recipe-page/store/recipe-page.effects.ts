import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { RecipePageService } from '../recipe-page.service';
import * as RecipePageActions from './recipe-page.actions';

@Injectable()
export class RecipePageEffects {
  constructor(
    private actions$: Actions,
    private recipePageService: RecipePageService
  ) {}

  getRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipePageActions.getRecipe),
      switchMap((action) => {
        return this.recipePageService.getRecipe(action.id).pipe(
          map((response) => {
            return RecipePageActions.getRecipeSuccess({
              recipe: response.recipe,
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
        return this.recipePageService.addToFavorites(action.recipe).pipe(
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
        return this.recipePageService.removeFromFavorites(action.id).pipe(
          map((response) => {
            return RecipePageActions.removeFromFavoritesSuccess();
          })
        );
      })
    )
  );
}

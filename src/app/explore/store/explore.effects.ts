import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as ExploreActions from './explore.actions';
import { RecipeService } from 'src/app/shared/services/recipe-page.service';

@Injectable()
export class ExploreEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) {}

  getRandomRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExploreActions.getRandomRecipes),
      switchMap((action) => {
        return this.recipeService.getRandomRecipes().pipe(
          map((response) => {
            // Map each recipe to include 'isFavorite' property
            const recipes = response.recipes.map((recipe: any) => ({
              ...recipe,
              isFavorite: false,
            }));

            return ExploreActions.getRandomRecipesSuccess({
              randomRecipes: recipes
            });
          })
        );
      })
    )
  );

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExploreActions.addToFavorites),
      switchMap((action) => {
        return this.recipeService.addToFavorites(action.recipe).pipe(
          map((response) => {
            return ExploreActions.addToFavoritesSuccess();
          })
        );
      })
    )
  );

  removeFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExploreActions.removeFromFavorites),
      switchMap((action) => {
        return this.recipeService.removeFromFavorites(action.id).pipe(
          map((response) => {
            return ExploreActions.removeFromFavoritesSuccess();
          })
        );
      })
    )
  );
}

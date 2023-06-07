import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { FavoritesService } from '../favorites.service';
import * as FavoritesActions from './favorites.actions';

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService
  ) {}

  getRandomRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.getFavoritedRecipes),
      switchMap((action) => {
        return this.favoritesService.getFavoritedRecipes().pipe(
          map((response) => {
            return FavoritesActions.getFavoritedRecipesSuccess({
              favoritedRecipes: response.recipes,
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
        return this.favoritesService.addToFavorites(action.recipe).pipe(
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
        return this.favoritesService.removeFromFavorites(action.id).pipe(
          map((response) => {
            return FavoritesActions.removeFromFavoritesSuccess();
          })
        );
      })
    )
  );
}

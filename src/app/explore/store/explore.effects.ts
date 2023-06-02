import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { ExploreService } from '../explore.service';
import * as ExploreActions from './explore.actions';

@Injectable()
export class ExploreEffects {
  constructor(
    private actions$: Actions,
    private exploreService: ExploreService
  ) {}

  // getRandomRecipes$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ExploreActions.getRandomRecipes),
  //     switchMap((action) => {
  //       return this.exploreService.getRandomRecipes().pipe(
  //         map((response) => {
  //           return ExploreActions.getRandomRecipesSuccess({
  //             randomRecipes: response,
  //           });
  //         })
  //       );
  //     })
  //   )
  // );
}

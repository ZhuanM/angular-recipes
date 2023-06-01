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

  // getSchool$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ExploreActions.getSchool),
  //     switchMap((action) => {
  //       return this.schoolService.getSchool(action.id).pipe(
  //         map((response) => {
  //           return ExploreActions.getSchoolSuccess({
  //             name: response.name,
  //             schoolAddress: response.address,
  //           });
  //         })
  //       );
  //     })
  //   )
  // );
}

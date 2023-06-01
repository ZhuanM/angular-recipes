import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { RecipePageService } from '../recipe-page.service';
import * as RecipePageActions from './recipe-page.actions';

@Injectable()
export class RecipePageEffects {
  constructor(
    private actions$: Actions,
    private exploreService: RecipePageService
  ) {}

  // getSchool$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RecipePageActions.getSchool),
  //     switchMap((action) => {
  //       return this.schoolService.getSchool(action.id).pipe(
  //         map((response) => {
  //           return RecipePageActions.getSchoolSuccess({
  //             name: response.name,
  //             schoolAddress: response.address,
  //           });
  //         })
  //       );
  //     })
  //   )
  // );
}

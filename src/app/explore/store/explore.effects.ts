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

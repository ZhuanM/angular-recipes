import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './../auth.service';
import { AppService } from '../../app.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageType } from 'src/app/shared/models/message-type.enum';
import { Auth } from 'src/app/shared/models/auth.interface';
import { setUserLocalStorageData } from 'src/app/shared/utility';

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap(action => {
      return this.authService.login(action.username, action.password)
        .pipe(
          tap(() => this.router.navigate(['/home'])),
          map(response => {
            this.setInitialLocalStorageData(response);

            return AuthActions.authSuccess(
              {
                accessToken: response.jwtToken,
                id: response.userId,
                role: response.role
              }
            )
          }),
          catchError((errorRes: HttpErrorResponse) => {
            return of(AuthActions.authFail(
              { errorMessage: 'Invalid username and/or password' }
            ));
          })
        );
      })
    )
  );

  // authSuccess$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(AuthActions.authSuccess),
  //   switchMap(action => {
  //     return this.authService.getUser(action.role, action.id)
  //       .pipe(
  //         map(response => {
  //           setUserLocalStorageData(response);

  //           this.appService.openSnackBar("Successfully logged in!", MessageType.Success);

  //           return AuthActions.getUserSuccess(
  //             {
  //               user: response
  //             }
  //           )
  //         })
  //       );
  //     })
  //   )
  // );

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logout),
      tap(() => this.router.navigate(['/home'])),
      map(() => {
        localStorage.clear();

        return AuthActions.logoutSuccess();
      }),
    )
  );

  // authRegisterUser$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(AuthActions.registerUser),
  //   switchMap(action => {
  //     const username = action.username;
  //     const password = action.password;
      
  //     return this.authService.registerUser(
  //       action.name,
  //       action.username,
  //       action.password)
  //       .pipe(
  //         map(authData => {
  //           return AuthActions.login({username: username, password: password})
  //         }),
  //         catchError((errorRes: HttpErrorResponse) => {
  //           if (errorRes?.error?.errorMessage == 'UniqueCitizenNumber exists!') {
  //             this.appService.openSnackBar('Unique Citizen Number already exists!', MessageType.Error);
  //           }
  //           if (errorRes?.error?.errorMessage == 'Username exists!') {
  //             this.appService.openSnackBar('Username already exists!', MessageType.Error);
  //           }

  //           return of(AuthActions.authFail(
  //             { errorMessage: 'Invalid email and/or password' }
  //           ));
  //         })
  //       );
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private appService: AppService,
    private router: Router
  ){}

  private setInitialLocalStorageData(authData: Auth) {
    localStorage.setItem('access_token', authData.jwtToken);
    localStorage.setItem('role', authData.role);
    localStorage.setItem('userId', authData.userId);
  }
}

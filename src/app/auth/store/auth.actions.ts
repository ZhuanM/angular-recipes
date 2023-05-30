import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth Component] Login',
  props<{
    username: string,
    password: string
  }>()
);

export const registerUser = createAction(
  '[Auth Component] Register User',
  props<{
    name: string,
    username: string,
    password: string,
  }>()
);

export const authSuccess = createAction(
  '[Auth Component] Auth Success',
  props<{
    accessToken: string,
    id: number,
    role: string
  }>()
);

export const authFail = createAction(
  '[Auth Component] Auth Fail',
  props<{
    errorMessage: string
  }>()
);

export const logout = createAction(
  '[Auth Component] Logout'
);

export const logoutSuccess = createAction(
  '[Auth Component] Logout Success'
);

export const resetErrorState = createAction(
  '[Auth Component] Reset Error State'
);

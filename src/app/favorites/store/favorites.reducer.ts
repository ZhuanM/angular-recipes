import { createReducer, on, Action } from '@ngrx/store';
// import * as FavoritesActions from './favorites.actions';

export interface State {

}

export const initialState: State = {

}

const _favoritesReducer = createReducer(
  initialState,

  // on(
  //   FavoritesActions.getSchoolSuccess,
  //   (state, action) => ({
  //     ...state,
  //     schoolName: action.name,
  //   })
  // ),
);

export function favoritesReducer(state: State, action: Action) {
  return _favoritesReducer(state, action);
}

import { createReducer, on, Action } from '@ngrx/store';
// import * as RecipePageActions from './recipe-page.actions';

export interface State {

}

export const initialState: State = {

}

const _recipePageReducer = createReducer(
  initialState,

  // on(
  //   RecipePageActions.getSchoolSuccess,
  //   (state, action) => ({
  //     ...state,
  //     schoolName: action.name,
  //     schoolAddress: action.schoolAddress
  //   })
  // ),
);

export function recipePageReducer(state: State, action: Action) {
  return _recipePageReducer(state, action);
}

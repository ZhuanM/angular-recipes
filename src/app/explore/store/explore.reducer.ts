import { createReducer, on, Action } from '@ngrx/store';
import * as ExploreActions from './explore.actions';

export interface State {
  randomRecipes: any
}

export const initialState: State = {
  randomRecipes: null
}

const _exploreReducer = createReducer(
  initialState,

  on(
    ExploreActions.getRandomRecipesSuccess,
    (state, action) => ({
      ...state,
      randomRecipes: action.randomRecipes
    })
  ),
);

export function exploreReducer(state: State, action: Action) {
  return _exploreReducer(state, action);
}

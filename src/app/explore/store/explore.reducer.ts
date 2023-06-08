import { createReducer, on, Action } from '@ngrx/store';
import * as ExploreActions from './explore.actions';
import { Recipe } from 'src/app/shared/models/recipe.interface';

export interface State {
  randomRecipes: Array<Recipe>,
  searchedRecipes: Array<Recipe>
}

export const initialState: State = {
  randomRecipes: null,
  searchedRecipes: null
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

  on(
    ExploreActions.searchRecipesSuccess,
    (state, action) => ({
      ...state,
      searchedRecipes: action.searchedRecipes
    })
  ),
);

export function exploreReducer(state: State, action: Action) {
  return _exploreReducer(state, action);
}

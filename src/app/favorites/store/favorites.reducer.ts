import { createReducer, on, Action } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.interface';
import * as FavoritesActions from './favorites.actions';

export interface State {
  favoritedRecipes: Array<Recipe>
}

export const initialState: State = {
  favoritedRecipes: null
}

const _favoritesReducer = createReducer(
  initialState,

  on(
    FavoritesActions.getFavoritedRecipesSuccess,
    (state, action) => ({
      ...state,
      favoritedRecipes: action.favoritedRecipes,
    })
  ),
);

export function favoritesReducer(state: State, action: Action) {
  return _favoritesReducer(state, action);
}

import { createReducer, on, Action } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.interface';
import * as RecipePageActions from './recipe-page.actions';

export interface State {
  recipe: Recipe
}

export const initialState: State = {
  recipe: null
}

const _recipePageReducer = createReducer(
  initialState,

  on(
    RecipePageActions.getRecipeSuccess,
    (state, action) => ({
      ...state,
      recipe: action.recipe,
    })
  ),
);

export function recipePageReducer(state: State, action: Action) {
  return _recipePageReducer(state, action);
}

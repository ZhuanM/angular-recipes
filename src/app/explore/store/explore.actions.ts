import { createAction, props } from "@ngrx/store";

export const getRandomRecipes = createAction(
  '[Explore Component] Get Random Recipes'
);

export const getRandomRecipesSuccess = createAction(
  '[Explore Component] Get Random Recipes Success',
  props<{
    randomRecipes: any
  }>()
);

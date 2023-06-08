import { createAction, props } from "@ngrx/store";
import { Recipe } from "src/app/shared/models/recipe.interface";

export const getRecipe = createAction(
  '[Recipe Page Component] Get Recipe',
  props<{
    id: any
  }>()
);

export const getRecipeSuccess = createAction(
  '[Recipe Page Component] Get Recipe Success',
  props<{
    recipe: Recipe
  }>()
);

export const addToFavorites = createAction(
  '[Recipe Page Component] Add To Favorites',
  props<{
    recipe: Recipe
  }>()
);

export const addToFavoritesSuccess = createAction(
  '[Recipe Page Component] Add To Favorites Success'
);

export const removeFromFavorites = createAction(
  '[Recipe Page Component] Remove From Favorites',
  props<{
    id: number
  }>()
);

export const removeFromFavoritesSuccess = createAction(
  '[Recipe Page Component] Remove From Favorites Success'
);

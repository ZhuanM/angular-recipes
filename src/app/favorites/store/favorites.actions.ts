import { createAction, props } from "@ngrx/store";
import { Recipe } from "src/app/shared/models/recipe.interface";

export const getFavoritedRecipes = createAction(
  '[Favorites Component] Get Favorited Recipes'
);

export const getFavoritedRecipesSuccess = createAction(
  '[Favorites Component] Get Favorited Recipes Success',
  props<{
    favoritedRecipes: Array<Recipe>
  }>()
);

export const addToFavorites = createAction(
  '[Favorites Component] Add To Favorites',
  props<{
    recipe: Recipe
  }>()
);

export const addToFavoritesSuccess = createAction(
  '[Favorites Component] Add To Favorites Success'
);

export const removeFromFavorites = createAction(
  '[Favorites Component] Remove From Favorites',
  props<{
    id: number
  }>()
);

export const removeFromFavoritesSuccess = createAction(
  '[Favorites Component] Remove From Favorites Success'
);

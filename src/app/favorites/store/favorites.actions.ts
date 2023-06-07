import { createAction, props } from "@ngrx/store";
import { Recipe } from "src/app/shared/models/recipe.interface";

export const getFavoritedRecipes = createAction(
  '[Explore Component] Get Favorited Recipes'
);

export const getFavoritedRecipesSuccess = createAction(
  '[Explore Component] Get Favorited Recipes Success',
  props<{
    favoritedRecipes: Array<Recipe>
  }>()
);

export const addToFavorites = createAction(
  '[Explore Component] Add To Favorites',
  props<{
    recipe: Recipe
  }>()
);

export const addToFavoritesSuccess = createAction(
  '[Explore Component] Add To Favorites Success'
);

export const removeFromFavorites = createAction(
  '[Explore Component] Remove From Favorites',
  props<{
    id: number
  }>()
);

export const removeFromFavoritesSuccess = createAction(
  '[Explore Component] Remove From Favorites Success'
);

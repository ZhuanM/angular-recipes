import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./favorites.reducer";

const favoritesSelector = createFeatureSelector<AppState, State>('favorites');

export const favoritedRecipes = createSelector(
  favoritesSelector,
  (state: State) => state.favoritedRecipes
);

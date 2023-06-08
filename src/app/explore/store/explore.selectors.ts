import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./explore.reducer";

const exploreSelector = createFeatureSelector<AppState, State>('explore');

export const randomRecipes = createSelector(
  exploreSelector,
  (state: State) => state.randomRecipes
);

export const searchedRecipes = createSelector(
  exploreSelector,
  (state: State) => state.searchedRecipes
);

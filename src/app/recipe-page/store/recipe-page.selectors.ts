import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./recipe-page.reducer";

const recipePageSelector = createFeatureSelector<AppState, State>('recipePage');

export const recipe = createSelector(
  recipePageSelector,
  (state: State) => state.recipe
);

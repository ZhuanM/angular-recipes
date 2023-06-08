import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../shared/models/recipe.interface';
import { appLoading } from '../shared/loader/store/loader.actions';
import * as RecipePageSelectors from '../recipe-page/store/recipe-page.selectors';
import * as RecipePageActions from '../recipe-page/store/recipe-page.actions';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
})
export class RecipePageComponent extends BaseComponent {
  readonly recipe$: Observable<Recipe> = this.store.pipe(select(RecipePageSelectors.recipe),takeUntil(this.destroyed$));

  public recipe: Recipe;

  private isFavorited: boolean;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    super();

    this.recipe$.pipe(takeUntil(this.destroyed$)).subscribe((recipe) => {
      if (recipe) {
        let tags = recipe.tags || [];

        if (tags.length === 0) {
          if (recipe.vegetarian) tags.push('Vegetarian');
          if (recipe.vegan) tags.push('Vegan');
          if (recipe.glutenFree) tags.push('Gluten Free');
          if (recipe.dairyFree) tags.push('Dairy Free');
        }

        this.recipe = { ...recipe, tags };

        this.recipe.isFavorite = this.isFavorited;
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isFavorited = params['isFavorite'] === 'true' ? true : false;
    });

    const recipeId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(RecipePageActions.getRecipe({ id: recipeId }));
  }

  public onFavorite() {
    let updatedRecipe = { ...this.recipe, isFavorite: !this.recipe.isFavorite };

    this.store.dispatch(appLoading({ loading: true }));
    if (updatedRecipe.isFavorite) {
      this.store.dispatch(RecipePageActions.addToFavorites({ recipe: updatedRecipe }));
    } else {
      this.store.dispatch(RecipePageActions.removeFromFavorites({ id: updatedRecipe.id }));
    }
  
    this.recipe = updatedRecipe;
  }
}

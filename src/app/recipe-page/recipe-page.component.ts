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
  readonly recipe$: Observable<Recipe> = this.store.pipe(
    select(RecipePageSelectors.recipe),
    takeUntil(this.destroyed$)
  );

  public recipe: Recipe;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    super();

    this.recipe$.pipe(takeUntil(this.destroyed$)).subscribe((recipe) => {
      if (recipe) {
        this.recipe = recipe;

        if (!this.recipe.hasOwnProperty('tags')) {
          this.recipe.tags = [];

          if (this.recipe.vegetarian) this.recipe.tags.push('Vegetarian');
          if (this.recipe.vegan) this.recipe.tags.push('Vegan');
          if (this.recipe.glutenFree) this.recipe.tags.push('Gluten Free');
          if (this.recipe.dairyFree) this.recipe.tags.push('Dairy Free');
        }
      }
    });
  }

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(appLoading({ loading: true }));
    // TODO ADD API CALL FOR GETTING RECIPE BY ID
  }

  public onFavorite() {
    this.recipe.isFavorite = !this.recipe.isFavorite;

    if (this.recipe.isFavorite) {
      this.store.dispatch(RecipePageActions.addToFavorites({ recipe: this.recipe }));
    } else {
      this.store.dispatch(RecipePageActions.removeFromFavorites({ id: this.recipe.id }));
    }
  }
}

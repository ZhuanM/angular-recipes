import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import * as ExploreSelectors from '../explore/store/explore.selectors';
import * as ExploreActions from '../explore/store/explore.actions';
import { Router } from '@angular/router';
import { Recipe } from '../shared/models/recipe.interface';
import { appLoading } from '../shared/loader/store/loader.actions';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent extends BaseComponent {
  readonly randomRecipes$: Observable<Array<Recipe>> = this.store.pipe(select(ExploreSelectors.randomRecipes), takeUntil(this.destroyed$));

  public recipes: Array<Recipe> = [];
  public isLoadingData = false;

  constructor(private store: Store<AppState>, private router: Router) { 
    super();

    this.randomRecipes$.pipe(takeUntil(this.destroyed$)).subscribe(randomRecipes => {
      const recipesWithTags = randomRecipes.map(recipe => {
        const tags: Array<string> = [];
        
        if (recipe.vegetarian) tags.push('Vegetarian');
        if (recipe.vegan) tags.push('Vegan');
        if (recipe.glutenFree) tags.push('Gluten Free');
        if (recipe.dairyFree) tags.push('Dairy Free');

        return { ...recipe, tags }; // return the recipe with added tags property
      });
  
      this.recipes = [...this.recipes, ...recipesWithTags];
      this.isLoadingData = false;
    });
  }

  ngOnInit() {
    this.loadMore();
  }

  public loadMore() {
    if (this.isLoadingData) {
      return; // Don't load more if we're already loading
    }

    this.isLoadingData = true;
    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(ExploreActions.getRandomRecipes());
  }

  public openRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe.id]);
  }

  public onToggleFavorite({recipe, isFavorited}: {recipe: Recipe, isFavorited: boolean}) {
    this.store.dispatch(appLoading({ loading: true }));
    if (isFavorited) {
      this.store.dispatch(ExploreActions.addToFavorites({ recipe: recipe }));
    } else {
      this.store.dispatch(ExploreActions.removeFromFavorites({ id: recipe.id }));
    }
  }
}

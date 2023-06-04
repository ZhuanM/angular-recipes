import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import * as ExploreSelectors from '../explore/store/explore.selectors';
import * as ExploreActions from '../explore/store/explore.actions';
import { mockData } from '../shared/api/api-response-example';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent extends BaseComponent {
  readonly randomRecipes$: Observable<any> = this.store.pipe(select(ExploreSelectors.randomRecipes), takeUntil(this.destroyed$));

  public recipes: Array<any> = []; // replace with your recipe type
  public page = 0;
  public isLoadingData = false; // new flag to indicate if we are currently loading data

  constructor(private store: Store<AppState>, private router: Router) { 
    super();
  }

  ngOnInit() {
    this.loadMore();
  }

  public loadMore() {
    // TODO Add actions with real API calls when done (+ add an app loader)
    if (this.isLoadingData) {
      return; // Don't load more if we're already loading
    }
    this.isLoadingData = true; // Set loading to true to start loading

    const data = mockData;
    const recipesWithTags = data.results.map(recipe => {
      const tags = [];
      if (recipe.vegetarian) tags.push('Vegetarian');
      if (recipe.vegan) tags.push('Vegan');
      if (recipe.glutenFree) tags.push('Gluten Free');
      if (recipe.dairyFree) tags.push('Dairy Free');
      return { ...recipe, tags };  // return the recipe with added tags property
    });

    this.recipes = [...this.recipes, ...recipesWithTags];
    this.page++;
    this.isLoadingData = false;
  }

  public openRecipe(recipe: any) {
    this.router.navigate(['/recipe', recipe.id]);
  }

  public onToggleFavorite(recipe: any) {
    // TODO Handle the toggle of favorite here. Eg: send a request to your API
  }
}

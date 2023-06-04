import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';
import { mockData } from '../shared/api/api-response-example';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent extends BaseComponent {
  public recipe: any;

  // TODO REMOVE (FOR TESTING PURPOSES ONLY)
  public allRecipes: any;
  
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { 
    super();
  }

  ngOnInit() {
    // TODO ADD API CALL FOR GETTING RECIPE BY ID
    const recipeId = this.route.snapshot.paramMap.get('id');
    this.allRecipes = mockData.results;
    this.recipe = this.allRecipes.find(recipe => recipe.id == recipeId);

    if (this.recipe) {
      const tags = [];
      if (this.recipe.vegetarian) tags.push('Vegetarian');
      if (this.recipe.vegan) tags.push('Vegan');
      if (this.recipe.glutenFree) tags.push('Gluten Free');
      if (this.recipe.dairyFree) tags.push('Dairy Free');
      this.recipe.tags = tags;
    }
  }

  public onFavorite() {
    // TODO ADD FAVORITE/UNFAVORITE FUNCTIONALITY API CALLS
  }
}

import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../models/recipe.interface';
import { apiUrls } from '../api-urls';


@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(
    private http: HttpClient,
  ) {}

  getRecipe(id: any) {
    return this.http.get<any>(
      apiUrls.getRecipeUrl + id.toString() + '/information', {
      params: {
        apiKey: 'a31f8125c4294d1f8b60075c8d52e584'
      }
    });
  }

  getRandomRecipes() {
    return this.http.get<any>(apiUrls.getRandomRecipesUrl, {
      params: {
        number: '8',
        apiKey: 'a31f8125c4294d1f8b60075c8d52e584'
      }
    });
  }

  getFavoritedRecipes() {
    return this.http.get<any>(
      apiUrls.favoriteRecipesUrl
    )
  }

  addToFavorites(recipe: Recipe) {
    const recipeCopy = { ...recipe };
    delete recipeCopy.tags;
    delete recipeCopy.isFavorite;

    return this.http.post<any>(
      apiUrls.favoriteRecipesUrl, recipeCopy
    )
  }

  removeFromFavorites(id: number) {
    return this.http.delete<any>(
      apiUrls.favoriteRecipesUrl + '/' + id.toString()
    )
  }
}

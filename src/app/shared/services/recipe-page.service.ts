import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../models/recipe.interface';
import { apiUrls } from '../api-urls';


@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly apiKey = 'a8b7916ef0d8436593f77595bdda95cc';

  constructor(
    private http: HttpClient,
  ) {}

  getRecipe(id: any) {
    return this.http.get<any>(
      apiUrls.getRecipeUrl + id.toString() + '/information', {
      params: {
        apiKey: this.apiKey
      }
    });
  }

  getRandomRecipes() {
    return this.http.get<any>(apiUrls.getRandomRecipesUrl, {
      params: {
        number: '8',
        apiKey: this.apiKey
      }
    });
  }

  getFavoritedRecipes() {
    return this.http.get<any>(
      apiUrls.favoriteRecipesUrl
    )
  }

  searchRecipes(query: string) {
    return this.http.get<any>(
      apiUrls.searchRecipesUrl, {
      params: {
        apiKey: this.apiKey,
        number: '8',
        addRecipeInformation: true,
        query: query
      }
    });
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

import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';
import { Recipe } from '../shared/models/recipe.interface';


@Injectable({ providedIn: 'root' })
export class RecipePageService {
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

  addToFavorites(recipe: Recipe) {
    return this.http.post<any>(
      apiUrls.favoriteRecipesUrl,
      {
        "recipe": recipe,
      }
    )
  }

  removeFromFavorites(id: number) {
    return this.http.delete<any>(
      apiUrls.favoriteRecipesUrl + '/' + id.toString()
    )
  }
}

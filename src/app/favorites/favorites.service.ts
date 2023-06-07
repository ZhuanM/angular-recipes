import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';
import { Recipe } from '../shared/models/recipe.interface';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  constructor(
    private http: HttpClient,
  ) {}

  getFavoritedRecipes() {
    return this.http.get<any>(
      apiUrls.favoriteRecipesUrl
    )
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

import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';
import { mockData } from '../shared/api/api-response-example';
import { Recipe } from '../shared/models/recipe.interface';


@Injectable({ providedIn: 'root' })
export class ExploreService {
  constructor(
    private http: HttpClient,
  ) {}

  getRandomRecipes() {
    return this.http.get<any>(
      apiUrls.getRandomRecipesUrl
    )

    // TODO Remove (used for testing purposes)
    // return mockData;
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

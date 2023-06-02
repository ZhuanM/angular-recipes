import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';
import { mockData } from '../shared/api/api-response-example';


@Injectable({ providedIn: 'root' })
export class ExploreService {
  constructor(
    private http: HttpClient,
  ) {}

  getRandomRecipes() {
    // return this.http.get<any>(
    //   apiUrls.loginUrl
    // )

    return mockData;
  }
}

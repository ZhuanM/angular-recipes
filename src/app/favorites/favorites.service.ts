import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class FavoritesService {
  constructor(
    private http: HttpClient,
  ) {}
}

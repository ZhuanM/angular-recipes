import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from './../shared/api-urls';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  authHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  login(username: string, password: string) {
    return this.http.post<any>(
      apiUrls.loginUrl,
      {
        "username": username,
        "password": password
      },
      { headers: this.authHeaders }
    )
  }

  register(
    name: string,
    username: string,
    email: string,
    password: string,
    ) {
    return this.http.post<any>(
      apiUrls.registerUrl,
      {
        "name": name,
        "username": username,
        "email": email,
        "password": password,
      }
    )
  }
}

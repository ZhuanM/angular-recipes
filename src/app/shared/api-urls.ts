import { environment } from 'src/environments/environment';

export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'auth/token',
  registerUrl: environment.apiBaseUrl + 'api/user/register',
}

import { environment } from 'src/environments/environment';

export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'auth/initiate',
  registerUrl: environment.apiBaseUrl + 'auth',
  userUrl: environment.apiBaseUrl + 'user', // TODO CHANGE ENDPOINT FOR GET USER
  // Recipes
  getRandomRecipesUrl: 'https://api.spoonacular.com/recipes/random',
  favoriteRecipesUrl: environment.apiBaseUrl + 'favouriteRecipe', // GET, DELETE, POST
}

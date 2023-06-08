import { environment } from 'src/environments/environment';

export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'auth/initiate',
  registerUrl: environment.apiBaseUrl + 'auth',
  userUrl: environment.apiBaseUrl + 'user/', // Expects id
  // Recipes
  getRandomRecipesUrl: 'https://api.spoonacular.com/recipes/random',
  getRecipeUrl: 'https://api.spoonacular.com/recipes/',
  favoriteRecipesUrl: environment.apiBaseUrl + 'recipes', // GET, DELETE, POST
}

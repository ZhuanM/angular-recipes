import { environment } from 'src/environments/environment';

export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'auth/initiate',
  registerUrl: environment.apiBaseUrl + 'auth',
  // Recipes
  getRandomRecipesUrl: 'https://api.spoonacular.com/recipes/random?number=8', // Hardcoded to 8 results
  favoriteRecipesUrl: environment.apiBaseUrl + 'favouriteRecipe', // GET, DELETE, POST
}

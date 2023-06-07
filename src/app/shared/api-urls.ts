import { environment } from 'src/environments/environment';

export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'auth/initiate',
  registerUrl: environment.apiBaseUrl + 'auth',
  userUrl: environment.apiBaseUrl + 'user/id', // TODO CHANGE ENDPOINT FOR GET USER
  // Recipes
  getRandomRecipesUrl: 'https://api.spoonacular.com/recipes/random',
  getRecipeUrl: 'https://api.spoonacular.com/recipes/',
  favoriteRecipesUrl: environment.apiBaseUrl + 'favouriteRecipe', // GET, DELETE, POST
}

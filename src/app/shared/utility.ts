import { Recipe } from "./models/recipe.interface";
import { User } from "./models/user.interface";

export function getAccessToken() {
  const sessionAccessToken = localStorage.getItem('access_token');

  if (sessionAccessToken) {
    return sessionAccessToken;
  }

  return null;
}

export function setUserLocalStorageData(userData: User) {
  localStorage.setItem('username', userData.username);
  localStorage.setItem('name', userData.name);
  localStorage.setItem('email', userData.email);
}

export function arraysAreEqual(array1: Array<Recipe>, array2: Array<Recipe>) {
  // Remove the 'tags' property from the objects in the arrays before comparing
  const array1WithoutTags = array1.map(({ tags, ...rest }) => rest);
  const array2WithoutTags = array2.map(({ tags, ...rest }) => rest);
  return JSON.stringify(array1WithoutTags) === JSON.stringify(array2WithoutTags);
}

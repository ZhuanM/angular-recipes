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

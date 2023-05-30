export function getAccessToken() {
  const sessionAccessToken = localStorage.getItem('access_token');

  if (sessionAccessToken) {
    return sessionAccessToken;
  }

  return null;
}

export function setUserLocalStorageData(userData: any) {
  // localStorage.setItem('name', userData.name);
  // localStorage.setItem('uniqueCitizenNumber', userData.uniqueCitizenNumber);
  // localStorage.setItem('uniqueDoctorNumber', userData.uniqueDoctorNumber);
  // localStorage.setItem('healthTaxesPaidUntil', userData.healthTaxesPaidUntil);
  // localStorage.setItem('gp', userData.gp);
  // localStorage.setItem('engagedParty', userData.engagedParty);
  // localStorage.setItem('specializations', userData.specializations);
}

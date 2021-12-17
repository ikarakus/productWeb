import {User} from '../model/user';

export class UtilsGeneral {

  static getLang(): string {
      return localStorage.getItem( 'english-guru.user.lang');
  }

  static setLang(lang: string) {
    localStorage.setItem( 'english-guru.user.lang', lang);
  }


  static removeLogin() {
    localStorage.removeItem( 'english-guru.user');
  }


  static getUser(): User {
    return JSON.parse(localStorage.getItem('english-guru.user'));
  }

  static setUser(user: User) {
    localStorage.setItem( 'english-guru.user', JSON.stringify(user));
  }


  static clearCognitoStorage() {
    const arr = []; // Array to hold the keys
// Iterate over localStorage and insert the keys that meet the condition into arr
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).substring(0,7) === 'Cognito') {
        arr.push(localStorage.key(i));
      }
    }

// Iterate over arr and remove the items by key
    for (let i = 0; i < arr.length; i++) {
      localStorage.removeItem(arr[i]);
    }
  }
}

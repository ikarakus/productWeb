import {User} from '../model/user';
import {Product} from '../model/product';

export class UtilsGeneral {

  static getLang(): string {
      return localStorage.getItem( 'crea-test.product');
  }

  static setLang(lang: string) {
    localStorage.setItem( 'crea-test.lang', lang);
  }


  static removeLogin() {
    localStorage.removeItem( 'crea-test.user');
  }


  static getUser(): User {
    return JSON.parse(localStorage.getItem('crea-test.user'));
  }

  static setUser(user: User) {
    localStorage.setItem( 'crea-test.user', JSON.stringify(user));
  }

  static getProduct(): Product {
    return JSON.parse(sessionStorage.getItem( 'crea-test.product'));
  }

  static setProduct(product: Product) {
    sessionStorage.setItem( 'crea-test.product', JSON.stringify(product));
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

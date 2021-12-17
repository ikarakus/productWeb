import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {Auth} from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {
  }

  canActivate(): Promise < boolean > {
    return new Promise((resolve) => {
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then((user) => {
          if(user) {
            resolve(true);
          } else {
            throw new Error('user not found');
          }
        })
        .catch(() => {
          resolve(false);
          return this.router.navigate(['/']);
        });
    });
  }

  canLoad(): Promise < boolean > {
    return new Promise((resolve) => {
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then((user) => {
          if(user) {
            resolve(true);
          } else {
            throw new Error('user not found');
          }
        })
        .catch(() => {
          resolve(false);
          return this.router.navigate(['/']);
        });
    });
  }
}

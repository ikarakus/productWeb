import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Auth} from 'aws-amplify';
import {from} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UtilsGeneral} from '../utils/UtilsGeneral';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (UtilsGeneral.getUser()) {
      return from(
        Auth.currentSession().then(
          session => {
            // let idTokenExpire = session.getIdToken().getExpiration();
            // let currentTimeSeconds = Math.round(+new Date() / 1000);
            return session.getIdToken().getJwtToken();
          })
      ).pipe(
        switchMap(token => {
          return next.handle(this.injectToken(request,token));
        })
      );
    };
    return next.handle(request);
  }

  injectToken(request: HttpRequest<any>,token:string) {
    return request.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
  }

}

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Observable, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService, private router: Router,private spinner: NgxSpinnerService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((response: HttpErrorResponse) => {
          let errorMessage = '';
          if (response.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${response.error.message}`;
            this.spinner.hide();
            this.toasterService.error(errorMessage, 'client-side error');
          } else {
            // server-side error
            this.spinner.hide();
            errorMessage = ` status: ${response.status}\n message: ${response.message}\n error: ${response.error.error}`;
            if (response.status == 0) {
              errorMessage = 'Unable to connect to server: may be caused by firewall or network problem';
            }
            this.toasterService.error(errorMessage, 'server-side error');
          }
          console.log(errorMessage);
          return of(null);
        })
      );
  }


}

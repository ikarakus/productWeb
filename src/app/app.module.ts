import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {TokenInterceptor} from './interceptor/token.interceptor';
import {ErrorInterceptor} from './interceptor/error.interceptor';
import {LoginComponent} from './login/login.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {AmplifyUIAngularModule} from '@aws-amplify/ui-angular';
import {RatingModule} from 'ng-starrating';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DebounceClickDirective} from './debounce-click.directive';
import {MatOptionModule, MatSelectModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DebounceClickDirective
  ],
  imports: [
    AmplifyUIAngularModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    }),
    RatingModule,
    MatOptionModule,
    MatSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    NgxSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('App loaded.');
  }
}

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  console.log('Translate loaded.');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + Date.now());
}


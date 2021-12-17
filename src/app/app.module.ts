import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {MaterialModule} from './app-material/material.module';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {TokenInterceptor} from './interceptor/token.interceptor';
import {ErrorInterceptor} from './interceptor/error.interceptor';
import {LoginComponent} from './login/login.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {CountdownGlobalConfig, CountdownModule} from 'ngx-countdown';
import {AmplifyUIAngularModule} from '@aws-amplify/ui-angular';
import {RatingModule} from 'ng-starrating';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmDialogComponent
  ],
    imports: [
        AmplifyUIAngularModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
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
        CountdownModule,
        RatingModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: CountdownGlobalConfig
    },
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
  entryComponents: [ConfirmDialogComponent],
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


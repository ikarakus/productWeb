import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '',component: LoginComponent, pathMatch: 'full'},
  {path: 'product', loadChildren: () => import('./product/product.module').
    then(m => m.ProductModule), canActivate: [AuthGuard]},
  {path: 'privacy', loadChildren: () => import('./privacy/privacy.module').
    then(m => m.PrivacyModule)},
  {path: 'terms', loadChildren: () => import('./terms/terms.module').
    then(m => m.TermsModule)},
  {path: '**', loadChildren: () => import('./not-found/not-found.module').
    then(m => m.NotFoundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

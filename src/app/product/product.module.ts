import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {TranslateModule} from '@ngx-translate/core';
import {RatingModule} from 'ng-starrating';
import { ReviewsComponent } from './reviews/reviews.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OrderModule} from 'ngx-order-pipe';


@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ReviewsComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        TranslateModule,
        RatingModule,
        ReactiveFormsModule,
        OrderModule
    ]
})
export class ProductModule { }

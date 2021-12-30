import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {TranslateModule} from '@ngx-translate/core';
import {RatingModule} from 'ng-starrating';
import { ReviewsComponent } from './reviews/reviews.component';


@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ReviewsComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        TranslateModule,
        RatingModule,
    ]
})
export class ProductModule { }

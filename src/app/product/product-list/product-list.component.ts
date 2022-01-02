import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Observable} from 'rxjs';
import {UtilsGeneral} from '../../utils/UtilsGeneral';
import {Product} from '../../model/product';
import {Review} from '../../model/review';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList$:Observable<Product[]>;
  reviewList: Review[];
  constructor(private service:ProductService) {}

  ngOnInit() {
    this.productList$ = this.service.getProducts();
  }

  setProduct(product:Product) {
    UtilsGeneral.setProduct(product);
  }

  public calculateRate(id: number) {
    this.reviewList = UtilsGeneral.getReviewList();
    if (this.reviewList) {
      this.reviewList = this.reviewList.filter(item => item.productId===id);
      if (this.reviewList.length > 0 ) {
        return this.reviewList.reduce((sum, current) => sum + current.rate, 0) / this.reviewList.length;
      }
    }
  }
}

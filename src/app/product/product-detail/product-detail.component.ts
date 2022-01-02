import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {UtilsGeneral} from '../../utils/UtilsGeneral';
import {Review} from '../../model/review';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product: Product;
  public numberOfComments = 0;
  public averageRate = 0;
  reviewList: Review[];
  constructor() {
    this.product =UtilsGeneral.getProduct();
    this.reviewList = UtilsGeneral.getReviewList();
  }

  ngOnInit() {
    if (this.reviewList) {
      this.reviewList = this.reviewList.filter(item => item.productId===this.product.id);
      if (this.reviewList.length > 0 ) {
        this.averageRate = this.reviewList.reduce((sum, current) => sum + current.rate, 0) / this.reviewList.length;
      }
    }
  }

  receiveReview(data:any) {
    if (data) {
      this.averageRate = data.averageRate;
      this.numberOfComments = data.numberOfComments;
    }
  }
}

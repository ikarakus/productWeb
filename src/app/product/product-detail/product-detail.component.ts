import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {UtilsGeneral} from '../../utils/UtilsGeneral';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product: Product;
  public numberOfComments = 0;
  public averageRate = 0;
  constructor() {
    this.product =UtilsGeneral.getProduct();
  }

  ngOnInit() {
  }

  receiveReview(data:any) {
    if (data) {
      this.averageRate = data.averageRate;
      this.numberOfComments = data.numberOfComments;
    }
  }
}

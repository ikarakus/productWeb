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
  constructor() {
    this.product =UtilsGeneral.getProduct();
  }

  ngOnInit() {}

}

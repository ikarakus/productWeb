import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Observable} from 'rxjs';
import {ProductModel} from '../../model/productModel';
import {UtilsGeneral} from '../../utils/UtilsGeneral';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productModel$:Observable<ProductModel>;
  public s3Url: string;
  constructor(private service:ProductService) { }

  ngOnInit() {
    this.productModel$ = this.service.getProducts();
  }

  setProduct(product:Product) {
    UtilsGeneral.setProduct(product);
  }
}

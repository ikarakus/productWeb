import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Observable} from 'rxjs';
import {UtilsGeneral} from '../../utils/UtilsGeneral';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList$:Observable<Product[]>;

  constructor(private service:ProductService) { }

  ngOnInit() {
    this.productList$ = this.service.getProducts();
  }

  setProduct(product:Product) {
    UtilsGeneral.setProduct(product);
  }
}

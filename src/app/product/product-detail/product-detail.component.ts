import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductDetail} from '../../model/productDetail';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public productDet$: Observable<ProductDetail>;
  public productDet: ProductDetail;
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productDet$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    this.productDet$.subscribe((res:any)=> {
      this.productDet = res.detail;
    });
  }

}

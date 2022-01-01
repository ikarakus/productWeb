import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../model/product';
import {Review} from '../../model/review';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsGeneral} from '../../utils/UtilsGeneral';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {StarRatingComponent} from 'ng-starrating';
import {OrderPipe} from 'ngx-order-pipe';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  @Input() product: Product;
  public review: Review;
  public reviewList: Review[];
  reviewForm: FormGroup;
  @ViewChild('rating',{static : false}) rating: StarRatingComponent;
  constructor(private toastr: ToastrService, public translate: TranslateService,private orderPipe: OrderPipe) {
    this.reviewList = UtilsGeneral.getReviewList();
    if (!this.reviewList) {
      this.reviewList = [];
    }
  }

  ngOnInit() {
    this.createReviewForm();
    if (this.reviewList.length > 0) {
      this.reviewList = this.reviewList.filter(item => item.productId===this.product.id);
    }
  }

  onRate($event: {newValue: number}) {
    this.reviewForm.controls['rate'].setValue($event.newValue);
  }


  createReviewForm () {
    this.reviewForm = new FormGroup({
      rate: new FormControl(0,Validators.required),
      comment: new FormControl('',Validators.required)
    });
  }

  save() {
    this.review = {} as Review;
    this.review.reviewDate = new Date();
    this.review.productId = this.product.id;
    this.review.comment = this.reviewForm.controls['comment'].value;
    this.review.rate = this.reviewForm.controls['rate'].value;
    if (this.review.comment && this.review.rate > 0) {
      this.reviewList.push(this.review);
      UtilsGeneral.setReviewList(this.reviewList);
      this.reviewForm.reset();
      this.rating.value = 0;
      this.reviewList = this.orderPipe.transform(this.reviewList, 'reviewDate');
      this.toastr.warning(this.translate.instant('product.saved'));
    } else {
        this.toastr.warning(this.translate.instant('product.rating_warn'));
        return;
    }
  }
}

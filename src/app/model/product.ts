import {ProductDetail} from './productDetail';

export interface Product {
  id: number;
  name: string;
  price: string;
  thumbnail_url: string;
  detail: ProductDetail;
}

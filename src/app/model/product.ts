import {ProductDetail} from './productDetail';

export interface Product {
  id: number;
  name: string;
  price: string;
  rating: string;
  thumbnail_url: string;
  detail: ProductDetail;
}

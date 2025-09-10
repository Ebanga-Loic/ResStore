import { Product } from './product';

export type Basket = {
  basketId: string;
  items: Item[];
};

export class Item {
  constructor(product: Product, quantity: number) {
    this.productId = product.id;
    this.name = product.name;
    this.quantity = quantity;
    this.price = product.price;
    this.pictureUrl = product.pictureUrl;
    this.brand = product.brand;
    this.type = product.type;
  }

  productId: number;
  name: string;
  quantity: number;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

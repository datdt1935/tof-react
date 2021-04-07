import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const newProdId = Math.random().toString();
    const newProduct = new Product(newProdId, title, desc, price);
    this.products.push(newProduct);
    console.log(this.products);
    return newProdId;
  }
  getAllProducts(): Product[] {
    return this.products;
  }
}

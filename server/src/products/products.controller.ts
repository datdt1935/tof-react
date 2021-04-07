import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './product.model';
import { ProductsService } from './products.service';
@ApiTags('Product API')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Product,
  })
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDes: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productService.insertProduct(
      prodTitle,
      prodDes,
      prodPrice,
    );
    return { id: generatedId };
  }
  @Get()
  getProduct() {
    return this.productService.getAllProducts();
  }
}

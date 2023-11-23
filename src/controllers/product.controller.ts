import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterProduct } from '../use-cases/products/register-product';
import { ListProduct } from 'src/use-cases/products/list-products';

type RegisterProductInput = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
};

@Controller('products')
export class ProductController {
  constructor(
    private readonly registerProduct: RegisterProduct,
    private readonly listProducts: ListProduct,
  ) {}

  @ApiOperation({ summary: 'Endpoint for create Product' })
  @Post()
  async createProduct(@Body() body: RegisterProductInput) {
    await this.registerProduct.execute(body);
  }

  @ApiOperation({ summary: 'Endpoint for list all Product' })
  @Get()
  getAll() {
    return this.listProducts.execute();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterProduct } from '../use-cases/products/register-product';

type RegisterProductInput = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
};

@Controller('products')
export class ProductController {
  constructor(private readonly registerProduct: RegisterProduct) {}

  @ApiOperation({ summary: 'Endpoint for create Product' })
  @Post()
  async createProduct(@Body() body: RegisterProductInput) {
    await this.registerProduct.execute(body);
  }
}

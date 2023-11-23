import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterProduct } from '../use-cases/products/register-product';
import { ListProduct } from 'src/use-cases/products/list-products';
import { GetProduct } from 'src/use-cases/products/get-products';

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
    private readonly getProduct: GetProduct,
  ) {}

  @ApiOperation({ summary: 'Endpoint for create Product' })
  @Post()
  async createProduct(@Body() body: RegisterProductInput) {
    await this.registerProduct.execute(body);
  }

  @ApiOperation({ summary: 'Endpoint for list all Products' })
  @Get()
  getAll() {
    return this.listProducts.execute();
  }

  @ApiOperation({ summary: 'Endpoint for list one Product' })
  @Get(':id')
  async getOneCategory(@Param('id') id: string) {
    const category = await this.getProduct.execute(id);
    return category;
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterCategory } from '../use-cases/categories/register-category';
import { ListCategory } from '../use-cases/categories/list-category';
import { GetCategory } from 'src/use-cases/categories/get-category';

type RegisterCategoryInput = {
  name: string;
};

@Controller()
export class CategoryController {
  constructor(
    private readonly registerCategory: RegisterCategory,
    private readonly listCategory: ListCategory,
    private readonly getCategory: GetCategory,
  ) {}

  @Post()
  cretateCategory(@Body() body: RegisterCategoryInput) {
    this.registerCategory.execute(body);
  }

  @Get()
  getAll() {
    return this.listCategory.execute();
  }

  @Get(':id')
  async getOneCategory(@Param('id') id: string) {
    const category = await this.getCategory.execute(id);
    return category;
  }
}

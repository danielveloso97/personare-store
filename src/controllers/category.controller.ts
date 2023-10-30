import { Body, Controller, Post } from '@nestjs/common';
import { RegisterCategory } from '../use-cases/categories/register-category';

type RegisterCategoryInput = {
  name: string;
};

@Controller()
export class CategoryController {
  constructor(private readonly registerCategory: RegisterCategory) {}

  @Post()
  cretateCategory(@Body() body: RegisterCategoryInput) {
    this.registerCategory.execute(body);
  }
}

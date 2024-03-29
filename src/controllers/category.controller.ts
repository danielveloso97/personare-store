import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterCategory } from '../use-cases/categories/register-category';
import { ListCategory } from '../use-cases/categories/list-category';
import { GetCategory } from 'src/use-cases/categories/get-category';
import { DeleteCategory } from 'src/use-cases/categories/delete-category';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

type RegisterCategoryInput = {
  name: string;
};

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly registerCategory: RegisterCategory,
    private readonly listCategory: ListCategory,
    private readonly getCategory: GetCategory,
    private readonly deletCategory: DeleteCategory,
  ) {}

  @ApiOperation({ summary: 'Endpoint for create category' })
  @Post()
  cretateCategory(@Body() body: RegisterCategoryInput) {
    this.registerCategory.execute(body);
  }

  @ApiOperation({ summary: 'Endpoint for list all category' })
  @Get()
  getAll() {
    return this.listCategory.execute();
  }

  @ApiOperation({ summary: 'Endpoint for list one category' })
  @Get(':id')
  async getOneCategory(@Param('id') id: string) {
    const category = await this.getCategory.execute(id);
    return category;
  }

  @ApiOperation({ summary: 'Endpoint for delete one category' })
  @Delete(':slug')
  async removeCategory(@Param('slug') slug: string, @Res() res) {
    await this.deletCategory.execute(slug);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}

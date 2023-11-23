import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CategoryController } from './controllers/category.controller';
import { RegisterCategory } from './use-cases/categories/register-category';
import { CategoryProvider } from './database/category.repository';
import { ListCategory } from './use-cases/categories/list-category';
import { GetCategory } from './use-cases/categories/get-category';
import { DeleteCategory } from './use-cases/categories/delete-category';
import { ProductProvider } from './database/product.repository';
import { RegisterProduct } from './use-cases/products/register-product';
import { ProductController } from './controllers/product.controller';
import { ListProduct } from './use-cases/products/list-products';
import { GetProduct } from './use-cases/products/get-products';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  providers: [
    RegisterCategory,
    ListCategory,
    GetCategory,
    DeleteCategory,
    RegisterProduct,
    ListProduct,
    GetProduct,
    { provide: CategoryProvider.name, useClass: CategoryProvider },
    { provide: ProductProvider.name, useClass: ProductProvider },
  ],
  controllers: [CategoryController, ProductController],
})
export class AppModule {}

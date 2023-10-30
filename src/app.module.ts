import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CategoryController } from './controllers/category.controller';
import { RegisterCategory } from './use-cases/categories/register-category';
import { CategoryProvider } from './database/category.repository';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  providers: [
    RegisterCategory,
    { provide: CategoryProvider.name, useClass: CategoryProvider },
  ],
  controllers: [CategoryController],
})
export class AppModule {}

import { CreateCategorytDto } from '../dtos/create-category-dto';
import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  create(data: CreateCategorytDto): Promise<Category>;
  find(): Promise<Category[]>;
  findOne(slug: string): Promise<Category>;
}

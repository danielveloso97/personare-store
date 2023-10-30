import { CreateCategorytDto } from 'src/dtos/create-category-dto';
import { Category } from 'src/entities/category.entity';

export interface CategoryRepository {
  create(data: CreateCategorytDto): Promise<Category>;
}

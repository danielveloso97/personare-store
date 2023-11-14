import { Product } from 'src/entities/product.entity';
import { CreateCategorytDto } from '../dtos/create-category-dto';
import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  create(data: CreateCategorytDto): Promise<Category>;
  find(): Promise<Category[]>;
  findOne(slug: string): Promise<Category>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Category>;
  saveProducts(products: Product[], category: Category): Promise<void>;
}

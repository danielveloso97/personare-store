import { CreateProductDto } from 'src/dtos/create-product-dto';
import { Product } from 'src/entities/product.entity';

export interface ProductRepository {
  create(data: CreateProductDto): Promise<Product>;
  find(): Promise<Product[]>;
  findOne(slug: string): Promise<Product>;
}

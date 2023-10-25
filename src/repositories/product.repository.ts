import { Product } from 'src/entities/product.entity';

export interface ProductRepository {
  create(): Promise<Product>;
}

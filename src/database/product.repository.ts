import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductProvider implements ProductRepository {
  private repository: Repository<Product>;
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Product);
  }

  async create(): Promise<Product> {
    const product = this.repository.create();
    await this.repository.save(product);
    return product;
  }
}
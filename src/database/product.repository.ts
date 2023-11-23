import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product-dto';

@Injectable()
export class ProductProvider implements ProductRepository {
  private repository: Repository<Product>;
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Product);
  }

  async create(data: CreateProductDto): Promise<Product> {
    const product = this.repository.create(data);
    await this.repository.save(product);
    return product;
  }

  async find(): Promise<Product[]> {
    return this.repository.find();
  }

  async findOne(slug: string): Promise<Product> {
    const product = await this.repository.findOne({ where: { slug } });
    return product;
  }
}

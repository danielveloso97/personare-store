import { Inject, Injectable } from '@nestjs/common';
import { ProductProvider } from '../../database/product.repository';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListProduct {
  constructor(
    @Inject(ProductProvider.name)
    private productRepository: Repository<Product>,
  ) {}
  async execute(): Promise<Product[]> {
    return this.productRepository.find();
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductProvider } from '../../database/product.repository';
import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';

@Injectable()
export class GetProduct {
  constructor(
    @Inject(ProductProvider.name)
    private productRepository: ProductRepository,
  ) {}

  async execute(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne(slug);
    if (!product) {
      throw new NotFoundException('Produto não encontrado!');
    }
    return product;
  }
}

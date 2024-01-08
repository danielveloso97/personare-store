import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductProvider } from 'src/database/product.repository';
import { ProductRepository } from 'src/repositories/product.repository';

@Injectable()
export class DeleteProduct {
  constructor(
    @Inject(ProductProvider.name)
    private productRepository: ProductRepository,
  ) {}
  async execute(slug: string): Promise<void> {
    const product = await this.productRepository.findOne(slug);
    if (!product) {
      throw new NotFoundException('Produto não encontrado!');
    }
    await this.productRepository.delete(product.id);
  }
}

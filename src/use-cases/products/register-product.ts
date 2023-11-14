import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryProvider } from '../../database/category.repository';
import { ProductProvider } from '../../database/product.repository';
import { CategoryRepository } from '../../repositories/category.repository';
import { ProductRepository } from '../../repositories/product.repository';

type RegisterProductInput = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
};

@Injectable()
export class RegisterProduct {
  constructor(
    @Inject(ProductProvider.name)
    private productRepository: ProductRepository,
    @Inject(CategoryProvider.name)
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(input: RegisterProductInput): Promise<void> {
    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found!');
    }
    const slug = input.name.trim().toLocaleLowerCase().replace(/ /g, '-');
    const product = await this.productRepository.create({
      name: input.name,
      description: input.description,
      price: input.price,
      slug: slug,
      categoryId: category.id,
    });
    this.categoryRepository.saveProducts([product], category);
  }
}

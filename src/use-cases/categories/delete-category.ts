import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryProvider } from '../../database/category.repository';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class DeleteCategory {
  constructor(
    @Inject(CategoryProvider.name)
    private categoryRepository: CategoryRepository,
  ) {}
  async execute(slug: string): Promise<void> {
    const category = await this.categoryRepository.findOne(slug);
    if (!category) {
      throw new NotFoundException('Categoria não econtrada!');
    }
    await this.categoryRepository.delete(category.id);
  }
}

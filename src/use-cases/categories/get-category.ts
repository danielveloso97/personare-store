import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryProvider } from 'src/database/category.repository';
import { Category } from 'src/entities/category.entity';
import { CategoryRepository } from 'src/repositories/category.repository';

@Injectable()
export class GetCategory {
  constructor(
    @Inject(CategoryProvider.name)
    private categoryRepository: CategoryRepository,
  ) {}
  async execute(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(slug);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada!');
    }
    return category;
  }
}

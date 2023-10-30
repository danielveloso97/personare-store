import { Inject, Injectable } from '@nestjs/common';
import { CategoryProvider } from '../../database/category.repository';
import { CategoryRepository } from '../../repositories/category.repository';

type RegisterCategoryInput = {
  name: string;
};

@Injectable()
export class RegisterCategory {
  constructor(
    @Inject(CategoryProvider.name)
    private categoryRepository: CategoryRepository,
  ) {}
  async execute(input: RegisterCategoryInput): Promise<void> {
    const slug = input.name.trim().toLocaleLowerCase().replace(/ /g, '-');
    await this.categoryRepository.create({
      name: input.name,
      slug: slug,
    });
  }
}

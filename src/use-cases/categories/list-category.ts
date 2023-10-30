import { Inject, Injectable } from '@nestjs/common';
import { CategoryProvider } from '../../database/category.repository';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListCategory {
  constructor(
    @Inject(CategoryProvider.name)
    private categoryRepository: Repository<Category>,
  ) {}
  async execute(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}

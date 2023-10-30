import { Inject, Injectable } from '@nestjs/common';
import { CreateCategorytDto } from 'src/dtos/create-category-dto';
import { Category } from 'src/entities/category.entity';
import { CategoryRepository } from 'src/repositories/category.repository';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryProvider implements CategoryRepository {
  private repository: Repository<Category>;
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Category);
  }

  async create(data: CreateCategorytDto): Promise<Category> {
    const category = this.repository.create(data);
    await this.repository.save(category);
    return category;
  }
}

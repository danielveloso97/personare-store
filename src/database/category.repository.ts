import { Inject, Injectable } from '@nestjs/common';
import { CreateCategorytDto } from '../dtos/create-category-dto';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';
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

  find(): Promise<Category[]> {
    return this.repository.find();
  }

  async findOne(slug: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { slug } });
    return category;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { databaseProviders as DataP } from './database.providers';

@Module({
  imports: [ConfigModule],
  providers: [...DataP],
  exports: [...DataP],
})
export class DatabaseModule {}

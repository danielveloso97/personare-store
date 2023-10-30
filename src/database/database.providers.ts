import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: config.getOrThrow('HOST_DATABASE'),
        port: +config.getOrThrow('PORT_DATABASE'),
        username: config.getOrThrow('USER_DATABASE'),
        password: config.getOrThrow('PASSWORD_DATABASE'),
        database: config.getOrThrow('NAME_DATABASE'),
        entities: [resolve(__dirname, '..', 'entities', '*.{js,ts}')],
        synchronize: false,
      });
      return dataSource.initialize();
    },
  },
];

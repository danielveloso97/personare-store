/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import { resolve } from 'path';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_DATABASE,
  port: +process.env.PORT_DATABASE,
  username: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.NAME_DATABASE,
  synchronize: false,
  entities: [resolve(__dirname, '..', 'entities', '*.{js,ts}')],
  migrations: ['./src/database/migrations/*'],
});

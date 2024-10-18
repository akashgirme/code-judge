import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Problem, Tag, TestCase } from '../problem/entities';
import { User } from '../user/entities';
import { Submission } from '../submission/entities';
import { Solution } from '../solution/entities';

const DB_URL = process.env.DB_URL;
const commonTypeOrmConfig: DataSourceOptions = {
  logging: true,
  type: 'postgres',
  entities: [User, Problem, Tag, TestCase, Solution, Submission],
  synchronize: false,
  logNotifications: true,
  ssl: true,
};

export const getTypeOrmConfig = async (
  configService: ConfigService
): Promise<DataSourceOptions> => {
  return {
    ...commonTypeOrmConfig,
    extra: {
      ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('./db-ca.crt').toString(),
      },
    },
    url: configService.get<string>('DB_URL'),
  };
};

//TODO: Issue with migration generation > unable to locate @code-judge/common lib
const datasource = new DataSource({
  ...commonTypeOrmConfig,
  extra: {
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync('./db-ca.crt').toString(),
    },
  },
  url: DB_URL,
  migrations: ['db/migrations/*{.ts,.js}'],
});

export default datasource;

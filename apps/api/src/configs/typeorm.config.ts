import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Problem, Tag } from '../problem/entities';
import { User } from '../user/entities';
import { Submission } from '../submission/entities';
import { Solution } from '../solution/entities';

const db_url = process.env.DB_URL;
const commonTypeOrmConfig: DataSourceOptions = {
  logging: true,
  type: 'postgres',
  entities: [User, Problem, Tag, Solution, Submission],
  synchronize: true,
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
        ca: fs.readFileSync('./db-ssl-certificate.crt').toString(),
      },
    },
    url: configService.get<string>('DB_URL'),
  };
};

//TODO: Issue with migration generation > unable to locate @code-judge/common lib
const datasource = new DataSource({
  ...commonTypeOrmConfig,
  // url: process.env.DB_URL,
  extra: {
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync('./db-ssl-certificate.crt').toString(),
    },
  },
  url: db_url,
  migrations: ['db/migrations/*{.ts,.js}'],
});

export default datasource;

import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Problem, Topic } from '../problem/entities';
import { User } from '../user/entities';
import { Submission } from '../submission/entities';

const commonTypeOrmConfig: DataSourceOptions = {
  logging: true,
  type: 'postgres',
  entities: [User, Problem, Topic, Submission],
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
  url: '',
  migrations: ['db/migrations/*{.ts,.js}'],
});

export default datasource;

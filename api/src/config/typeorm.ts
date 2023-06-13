import { DataSource, DataSourceOptions } from "typeorm";
import {
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_SCHEMAS,
} from "../constants/enviroment";
import { ResultCrawl } from "../schemas/result-crawl";

const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_SCHEMAS,
  synchronize: true,
  entities: [ResultCrawl],
  migrations: [],
  migrationsTableName: "migrations",
};

export const AppDataSource = new DataSource(dataSourceOptions);

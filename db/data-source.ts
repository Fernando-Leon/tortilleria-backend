import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

// Crear la base de datos si no existe
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'mysqlprod.mysql.database.azure.com',
  port: 3306,
  username: 'ferleon',
  password: 'rootP@12',
  database: 'database_tortilleria',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

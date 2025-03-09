import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

/*
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'mysqlprod.mysql.database.azure.com',
  port: 3306,
  username: 'ferleon',
  password: 'rootP@12',
  database: 'database_tortilleria',
  //synchronize: true,
}
*/

/*
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'database_tortilleria',
}

*/

dotenv.config();

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

/**
 * 
 * hostname=mysqlprod.mysql.database.azure.com
port=3306
username=ferleon
password={your-password}
 */

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

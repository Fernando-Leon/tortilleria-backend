import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'mysqlprod.mysql.database.azure.com',
  port: 3306,
  username: 'ferleon',
  password: 'rootP@12',
  database: 'database_tortilleria',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  //synchronize: true,
}

/**
 * 
 * hostname=mysqlprod.mysql.database.azure.com
port=3306
username=ferleon
password={your-password}
 */

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

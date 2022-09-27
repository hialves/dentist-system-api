import 'dotenv/config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { join } from 'path'

export const databaseConfig: PostgresConnectionOptions = {
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  logging: process.env.TYPEORM_LOGGING === 'true' ?? false,
  port: Number(process.env.TYPEORM_PORT),
  entities: [join(__dirname, '..', 'modules/public/**/**/*.entity{.js,.ts}')],
  // migrations: [join(__dirname, '..', 'migrations/public/*{.js,.ts}')],
  database: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE : process.env.TYPEORM_DATABASE,
  host: process.env.TYPEORM_HOST,
  synchronize: true,
  // migrationsRun: true,
  type: 'postgres',
  schema: 'public',
}

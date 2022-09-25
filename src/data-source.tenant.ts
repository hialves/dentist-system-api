import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { databaseConfig } from './config/database'
import { join } from 'path'

export const AppDataSourceTenant = new DataSource({
  ...databaseConfig,
  entities: [join(__dirname, '..', 'modules/tenanted/*.ts')],
  migrations: [join(__dirname, '..', 'migrations/tenanted/*.ts')],
})

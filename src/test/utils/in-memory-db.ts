import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

export const getInMemoryDatabaseConfig = (isTenantModule: boolean = true): DataSourceOptions => {
  const config: DataSourceOptions = {
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [
      join(__dirname, '..', '..', `modules/${isTenantModule ? 'tenanted' : 'public'}/**/**/*.entity{.js,.ts}`),
    ],
    synchronize: true,
  }

  return config
}

export const InMemoryTypeormTestingDatabase = async (isTenantModule: boolean = true) => {
  const dataSource = new DataSource(getInMemoryDatabaseConfig(isTenantModule))

  await dataSource.initialize()

  return dataSource
}

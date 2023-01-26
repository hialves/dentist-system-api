import { join } from 'path'
import { DataSource } from 'typeorm'

export const InMemoryTypeormTestingDatabase = async (isTenantModule: boolean = true) => {
  const dataSource = new DataSource({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [
      join(__dirname, '..', '..', `modules/${isTenantModule ? 'tenanted' : 'public'}/**/**/*.entity{.js,.ts}`),
    ],
    synchronize: true,
  })

  await dataSource.initialize()

  return dataSource
}

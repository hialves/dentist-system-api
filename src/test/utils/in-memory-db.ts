import { DataSource, EntitySchema, MixedList } from 'typeorm'

export const InMemoryTypeormTestingDatabase = async (entities: MixedList<string | Function | EntitySchema<any>>) => {
  const dataSource = new DataSource({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities,
    synchronize: true,
  })

  await dataSource.initialize()

  return dataSource
}

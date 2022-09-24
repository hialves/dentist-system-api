import { DataSource } from 'typeorm'

export const DataSourceMock = {
  provide: DataSource,
  useValue: {
    createQueryRunner: () => ({
      connect: jest.fn(),
      manager: {
        save: (value) => {
          if (Array.isArray(value)) {
            value = value.map((item) => {
              item.id = Math.floor(Math.random() * 100)
              item.createdAt = new Date()
              item.updatedAt = new Date()

              return item
            })
          } else {
            value.id = Math.floor(Math.random() * 100)
            value.createdAt = new Date()
            value.updatedAt = new Date()
          }

          return value
        },
      },
      startTransaction: jest.fn(),
      release: jest.fn(),
      rollbackTransaction: jest.fn(),
      commitTransaction: jest.fn(),
    }),
  },
}

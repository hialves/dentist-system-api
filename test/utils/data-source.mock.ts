export const DataSourceMock = {
  createQueryRunner: () => ({
    connect: jest.fn(),
    manager: {
      save: (value) => value,
    },
    startTransaction: jest.fn(),
    release: jest.fn(),
    rollbackTransaction: jest.fn(),
    commitTransaction: jest.fn(),
  }),
}

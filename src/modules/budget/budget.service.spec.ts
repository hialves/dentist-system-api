import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions, Repository } from 'typeorm'
import { BudgetItemModule } from '../budget-item/budget-item.module'
import { BudgetService } from './budget.service'
import { Budget } from './entities/budget.entity'
import Database from 'better-sqlite3'
import { createMock } from '@golevelup/ts-jest'

describe('BudgetService', () => {
  let service: BudgetService
  // let testdb = new Database(':memory:', { verbose: console.log })
  // let dbConnect

  // beforeAll(async () => {
  //   dbConnect = new DataSource({
  //     name: 'default',
  //     type: 'better-sqlite3',
  //     database: ':memory:',
  //     entities: ['src/**/*.entity.ts'],
  //     synchronize: true,
  //   } as DataSourceOptions)
  //   await dbConnect.initialize()
  // })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BudgetItemModule],
      providers: [
        BudgetService,
        {
          provide: DataSource,
          useValue: createMock<DataSource>(),
        },
        {
          provide: getRepositoryToken(Budget),
          useValue: createMock<Repository<Budget>>(),
        },
      ],
      exports: [BudgetService],
    }).compile()

    service = module.get<BudgetService>(BudgetService)
  })

  it('should be defined', () => {
    expect(service.create).toBeDefined()
  })
})

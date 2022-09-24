import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { BudgetService } from './budget.service'
import { Budget } from './entities/budget.entity'
import { createMock } from '@golevelup/ts-jest'
import { BudgetItemService } from '../budget-item/budget-item.service'
import { BudgetItem } from '../budget-item/entities/budget-item.entity'
import { DataSourceMock } from '../../../test/utils/data-source.mock'

describe('BudgetService', () => {
  let service: BudgetService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BudgetService,
        BudgetItemService,
        {
          provide: DataSource,
          useValue: DataSourceMock,
        },
        {
          provide: getRepositoryToken(Budget),
          useValue: createMock<Repository<Budget>>(),
        },
        {
          provide: getRepositoryToken(BudgetItem),
          useValue: createMock<Repository<BudgetItem>>(),
        },
      ],
      exports: [BudgetService],
    }).compile()

    service = module.get<BudgetService>(BudgetService)
  })

  it('should be defined', () => {
    const dto = {
      clientId: 1,
      clinicId: 1,
      employeeId: 1,
      procedureIds: [1, 2],
    }
    const entity = BudgetService.createEntity(dto)

    expect(entity.clientId).toBeDefined()
    expect(entity.clinicId).toBeDefined()
    expect(entity.employeeId).toBeDefined()
    expect(entity.budgetItems).toBe(undefined)
  })
})

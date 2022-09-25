import { Test, TestingModule } from '@nestjs/testing'
import { BudgetItemRepositoryMock } from '../../test/utils/entity.mock'
import { BudgetItemService } from './budget-item.service'

describe('BudgetItemService', () => {
  let service: BudgetItemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetItemService, BudgetItemRepositoryMock],
    }).compile()

    service = module.get<BudgetItemService>(BudgetItemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { BudgetItemRepositoryMock } from '../../../test/utils/entity.mock'
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

  describe('createEntities', () => {
    it('should have the same size as in the set of the procedureIds', () => {
      const dto = { budgetId: 1, procedureIds: [1, 2, 3] }
      const set = new Set(dto.procedureIds)

      expect(dto.procedureIds.length).toBe(set.size)
    })

    it('should have the same length as in the set of procedureIds if there are repeated procedureIds', () => {
      const dto = { budgetId: 1, procedureIds: [1, 2, 2, 3] }
      const set = new Set(dto.procedureIds)
      const entities = BudgetItemService.createEntities(dto)

      expect(entities).toHaveLength(set.size)
    })

    it('should not have the same length as the procedureIds', () => {
      const dto = { budgetId: 1, procedureIds: [1, 2, 2, 3] }
      const entities = BudgetItemService.createEntities(dto)

      expect(entities.length === dto.procedureIds.length).toBeFalsy()
    })
  })
})

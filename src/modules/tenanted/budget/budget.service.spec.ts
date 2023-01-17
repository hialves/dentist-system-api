import { Test, TestingModule } from '@nestjs/testing'
import { BudgetService } from './budget.service'
import { BudgetItemService } from '../budget-item/budget-item.service'
import { DataSourceMock } from '../../../test/utils/data-source.mock'
import { BadRequestException } from '@nestjs/common'
import { BudgetItemRepositoryMock, BudgetRepositoryMock } from '../../../test/utils/entity.mock'

describe('BudgetService', () => {
  let service: BudgetService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [BudgetService, BudgetItemService, DataSourceMock, BudgetRepositoryMock, BudgetItemRepositoryMock],
    }).compile()

    service = module.get<BudgetService>(BudgetService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should have id, createdAt, updatedAt on return', async () => {
      const dto = {
        clientId: 1,
        clinicId: 1,
        employeeId: 1,
        procedureIds: [1, 2],
      }
      const budget = BudgetService.createEntity(dto)
      const result = await service.create(budget, dto.procedureIds)

      expect(result.id).toBeDefined()
      expect(result.budgetItems).toBeDefined()
      expect(result.budgetItems.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('createEntity', () => {
    it('should create entity with all fks set', () => {
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

    it('should throw BadRequestException if one of fks is unset', () => {
      const dto = {
        clientId: 1,
        clinicId: 1,
        employeeId: 1,
        procedureIds: [],
      }

      try {
        BudgetService.createEntity({ ...dto, clientId: undefined })
        expect(true).toBeFalsy()
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(e.status).toBe(400)
      }

      try {
        BudgetService.createEntity({ ...dto, clinicId: undefined })
        expect(true).toBeFalsy()
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(e.status).toBe(400)
      }

      try {
        BudgetService.createEntity({ ...dto, employeeId: undefined })
        expect(true).toBeFalsy()
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(e.status).toBe(400)
      }
    })

    it('should not contain budgetItems, id, createdAt, updatedAt in Budget entity', () => {
      const dto = {
        clientId: 1,
        clinicId: 1,
        employeeId: 1,
        procedureIds: [1, 2],
      }
      const entity = BudgetService.createEntity(dto)

      expect(entity.budgetItems).toBeUndefined()
      expect(entity.id).toBeUndefined()
      expect(entity.createdAt).toBeUndefined()
      expect(entity.updatedAt).toBeUndefined()
    })
  })
})

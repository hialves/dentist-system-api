import { Injectable, BadRequestException } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BaseService } from '../../../common/service.repository'
import { BudgetItemService } from '../budget-item/budget-item.service'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'
import { Budget } from './entities/budget.entity'

@Injectable()
export class BudgetService extends BaseService {
  constructor(private budgetItemService: BudgetItemService) {
    super(Budget)
  }

  async create(budget: Budget, procedureIds: number[], tenantDataSource: DataSource) {
    const queryRunner = tenantDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const t = queryRunner.manager

    try {
      await t.save(budget)
      const budgetItems = BudgetItemService.createEntities({ budgetId: budget.id, procedureIds })
      await this.budgetItemService.create(budgetItems, tenantDataSource, t)
      budget.budgetItems = budgetItems

      await queryRunner.commitTransaction()
      return budget
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }

  static createEntity(dto: CreateBudgetDto) {
    if (!dto.clientId || !dto.clinicId || !dto.employeeId) {
      throw new BadRequestException('Inform client, clinic and employee')
    }
    const budget = new Budget()
    budget.clientId = dto.clientId
    budget.clinicId = dto.clinicId
    budget.employeeId = dto.employeeId

    return budget
  }

  async update(id: number, dto: UpdateBudgetDto, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Budget)
    return repository.update({ id }, dto)
  }

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(Budget)
    return repository.delete({ id })
  }
}

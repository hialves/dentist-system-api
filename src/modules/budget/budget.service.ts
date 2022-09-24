import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { BudgetItemService } from '../budget-item/budget-item.service'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'
import { Budget } from './entities/budget.entity'

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly repo: Repository<Budget>,
    private dataSource: DataSource,
    private budgetItemService: BudgetItemService,
  ) {}

  async create(budget: Budget, procedureIds: number[]) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const t = queryRunner.manager

    try {
      await t.save(budget)
      const budgetItems = BudgetItemService.createEntities({ budgetId: budget.id, procedureIds })
      await this.budgetItemService.create(budgetItems, t)
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
    const budget = new Budget()
    budget.clientId = dto.clientId
    budget.clinicId = dto.clinicId

    return budget
  }

  findAll() {
    return `This action returns all budget`
  }

  findOne(id: number) {
    return `This action returns a #${id} budget`
  }

  update(id: number, dto: UpdateBudgetDto) {
    return `This action updates a #${id} budget`
  }

  remove(id: number) {
    return `This action removes a #${id} budget`
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, In, Repository } from 'typeorm'
import { CreateBudgetItemDto } from './dto/create-budget-item.dto'
import { BudgetItem } from './entities/budget-item.entity'

@Injectable()
export class BudgetItemService {
  constructor(
    @InjectRepository(BudgetItem)
    private readonly repo: Repository<BudgetItem>,
  ) {}

  async create(budgetItems: BudgetItem[], t?: EntityManager) {
    if (t) {
      return t.save(budgetItems)
    }
    await this.repo.upsert(budgetItems, ['budgetId', 'procedureId'])
    return budgetItems
  }

  static createEntities(dto: CreateBudgetItemDto) {
    return dto.procedureIds.map((procedureId) => {
      const budgetItem = new BudgetItem()
      budgetItem.budgetId = dto.budgetId
      budgetItem.procedureId = procedureId

      return budgetItem
    })
  }

  remove(id: number) {
    return `This action removes a #${id} budgetItem`
  }
}

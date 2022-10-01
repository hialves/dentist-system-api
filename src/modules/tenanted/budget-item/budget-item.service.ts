import { Injectable } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'
import { CreateBudgetItemDto } from './dto/create-budget-item.dto'
import { BudgetItem } from './entities/budget-item.entity'

@Injectable()
export class BudgetItemService {
  async create(budgetItems: BudgetItem[], tenantDataSource: DataSource, t?: EntityManager) {
    if (t) {
      return t.save(budgetItems)
    }
    await tenantDataSource.getRepository(BudgetItem).upsert(budgetItems, ['budgetId', 'procedureId'])
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

  remove(id: number, tenantDataSource: DataSource) {
    const repository = tenantDataSource.getRepository(BudgetItem)
    return repository.delete({ id })
  }
}

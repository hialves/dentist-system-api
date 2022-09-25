import { Column, Unique } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

@Unique('UQ_BUDGET_ITEM_BUDGET_ID_PROCEDURE_ID', ['budgetId', 'procedureId'])
export class BudgetItemDomain extends BaseEntity {
  @Column({ nullable: false })
  budgetId: number

  @Column({ nullable: false })
  procedureId: number
}

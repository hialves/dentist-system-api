import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class BudgetItemDomain extends BaseEntity {
  @Column({ nullable: false })
  budgetId: number

  @Column({ nullable: false })
  procedureId: number
}

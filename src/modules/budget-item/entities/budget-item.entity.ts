import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Budget } from '../../budget/entities/budget.entity'
import { Procedure } from '../../procedure/entities/procedure.entity'
import { BudgetItemDomain } from './budget-item.domain'

@Entity('budget_item')
export class BudgetItem extends BudgetItemDomain {
  @ManyToOne(() => Budget, (relation) => relation.budgetItems)
  @JoinColumn({ foreignKeyConstraintName: 'FK_BUDGET_ITEM_BUDGET_ID', name: 'budgetId', referencedColumnName: 'id' })
  budget: Budget

  @ManyToOne(() => Procedure, (relation) => relation.budgetItems)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_BUDGET_ITEM_PROCEDURE_ID',
    name: 'procedureId',
    referencedColumnName: 'id',
  })
  procedure: Procedure
}

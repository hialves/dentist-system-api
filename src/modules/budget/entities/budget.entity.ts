import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BudgetItem } from '../../budget-item/entities/budget-item.entity'
import { Client } from '../../client/entities/client.entity'
import { Clinic } from '../../clinic/entities/clinic.entity'

import { BudgetDomain } from './budget.domain'

@Entity('budget')
export class Budget extends BudgetDomain {
  @ManyToOne(() => Client, (relation) => relation.budgets)
  @JoinColumn({ foreignKeyConstraintName: 'FK_BUDGET_CLIENT_ID', name: 'clientId', referencedColumnName: 'id' })
  client: Client

  @ManyToOne(() => Clinic, (relation) => relation.budgets)
  @JoinColumn({ foreignKeyConstraintName: 'FK_BUDGET_CLINIC_ID', name: 'clinicId', referencedColumnName: 'id' })
  clinic: Clinic

  @OneToMany(() => BudgetItem, (relation) => relation.budget)
  budgetItems: BudgetItem[]
}

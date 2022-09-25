import { Entity, OneToMany } from 'typeorm'
import { BudgetItem } from '../../budget-item/entities/budget-item.entity'
import { ClientProcedure } from '../../client-procedure/entities/client-procedure.entity'
import { ProcedureHistory } from '../../procedure-history/entities/procedure-history.entity'
import { ProcedureDomain } from './procedure.domain'

@Entity('procedure')
export class Procedure extends ProcedureDomain {
  @OneToMany(() => ProcedureHistory, (relation) => relation.procedure)
  procedureHistories: ProcedureHistory[]

  @OneToMany(() => ClientProcedure, (relation) => relation.procedure)
  clientProcedures: ClientProcedure[]

  @OneToMany(() => BudgetItem, (relation) => relation.procedure)
  budgetItems: BudgetItem[]
}

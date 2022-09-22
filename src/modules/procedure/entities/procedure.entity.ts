import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { BudgetItem } from '../../budget-item/entities/budget-item.entity'
import { ClientProcedure } from '../../client-procedure/entities/client-procedure.entity'
import { ProcedureHistory } from '../../procedure-history/entities/procedure-history.entity'

@Entity('procedure')
export class Procedure extends BaseEntity {
  @Column({ nullable: false })
  name: string

  // numeric(7,2)
  @Column('numeric', { nullable: false })
  value: number

  @OneToMany(() => ProcedureHistory, (relation) => relation.procedure)
  procedureHistories: ProcedureHistory[]

  @OneToMany(() => ClientProcedure, (relation) => relation.procedure)
  clientProcedures: ClientProcedure[]

  @OneToMany(() => BudgetItem, (relation) => relation.procedure)
  budgetItems: BudgetItem[]
}

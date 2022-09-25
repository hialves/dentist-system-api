import { Entity, OneToMany } from 'typeorm'
import { Budget } from '../../budget/entities/budget.entity'
import { ClientProcedure } from '../../client-procedure/entities/client-procedure.entity'
import { Exam } from '../../exams/entities/exam.entity'
import { ClientDomain } from './client.domain'

@Entity('client')
export class Client extends ClientDomain {
  @OneToMany(() => ClientProcedure, (relation) => relation.client)
  clientProcedures: ClientProcedure[]

  @OneToMany(() => Budget, (relation) => relation.client)
  budgets: Budget[]

  @OneToMany(() => Exam, (relation) => relation.client)
  exams: Exam[]
}

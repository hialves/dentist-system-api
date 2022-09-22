import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { Budget } from '../../budget/entities/budget.entity'
import { ClientProcedure } from '../../client-procedure/entities/client-procedure.entity'

@Entity('client')
export class Client extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column('varchar', { nullable: true, length: 11 })
  document?: string

  @Column({ nullable: true })
  photo?: string

  @Column({ nullable: true })
  phone?: string

  @OneToMany(() => ClientProcedure, (relation) => relation.client)
  clientProcedures: ClientProcedure[]

  @OneToMany(() => Budget, (relation) => relation.client)
  budgets: Budget[]
}

import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { Budget } from '../../budget/entities/budget.entity'
import { ClientProcedure } from '../../client-procedure/entities/client-procedure.entity'
import { EmployeeClinic } from '../../employee_clinic/entities/employee-clinic.entity'

@Entity('clinic')
export class Clinic extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  document: string

  @Column({ nullable: true })
  address?: string

  @Column({ nullable: true })
  icon?: string

  @OneToMany(() => EmployeeClinic, (relation) => relation.clinic)
  employeeClinics: EmployeeClinic[]

  @OneToMany(() => ClientProcedure, (relation) => relation.clinic)
  clientProcedures: ClientProcedure[]

  @OneToMany(() => Budget, (relation) => relation.clinic)
  budgets: Budget[]
}

import { Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { Budget } from '../../budget/entities/budget.entity'
import { ClientProcedure } from '../../client-procedure/entities/client-procedure.entity'
import { EmployeeClinic } from '../../employee_clinic/entities/employee-clinic.entity'
import { ClinicDomain } from './clinic.domain'

@Entity('clinic')
export class Clinic extends ClinicDomain {
  @OneToMany(() => EmployeeClinic, (relation) => relation.clinic)
  employeeClinics: EmployeeClinic[]

  @OneToMany(() => ClientProcedure, (relation) => relation.clinic)
  clientProcedures: ClientProcedure[]

  @OneToMany(() => Budget, (relation) => relation.clinic)
  budgets: Budget[]
}

Object.assign(Clinic, BaseEntity)

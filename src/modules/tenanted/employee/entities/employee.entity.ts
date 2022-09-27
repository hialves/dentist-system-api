import { Entity, OneToMany } from 'typeorm'
import { ClientProcedure } from '../../client-procedure/entities/client-procedure.entity'
import { EmployeeClinic } from '../../employee_clinic/entities/employee-clinic.entity'
import { EmployeeDomain } from './employee.domain'

@Entity('employee')
export class Employee extends EmployeeDomain {
  @OneToMany(() => EmployeeClinic, (relation) => relation.employee)
  employeeClinics: EmployeeClinic[]

  @OneToMany(() => ClientProcedure, (relation) => relation.employee)
  clientProcedures: ClientProcedure[]
}

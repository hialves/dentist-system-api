import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { ClientProcedure } from '../../client-procedure/entities/client-procedure.entity'
import { EmployeeClinic } from '../../employee_clinic/entities/employee-clinic.entity'
import { Role } from '../../role/entities/role.entity'
import { EmployeeDomain } from './employee.domain'

@Entity('employee')
export class Employee extends EmployeeDomain {
  @OneToOne(() => Role, (relation) => relation.employee, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'FK_EMPLOYEE_ROLE_ID', name: 'roleId', referencedColumnName: 'id' })
  role: Role

  @OneToMany(() => EmployeeClinic, (relation) => relation.employee)
  employeeClinics: EmployeeClinic[]

  @OneToMany(() => ClientProcedure, (relation) => relation.employee)
  clientProcedures: ClientProcedure[]
}

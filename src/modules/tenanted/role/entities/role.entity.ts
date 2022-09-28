import { Entity, OneToMany, OneToOne } from 'typeorm'
import { Employee } from '../../employee/entities/employee.entity'
import { EmployeeClinic } from '../../employee_clinic/entities/employee-clinic.entity'
import { RolePermission } from '../../role_permission/entities/role_permission.entity'
import { RoleDomain, RoleSlugEnum } from './role.domain'

@Entity('role')
export class Role extends RoleDomain {
  @OneToMany(() => RolePermission, (relation) => relation.role)
  rolePermissions: RolePermission[]

  @OneToMany(() => EmployeeClinic, (relation) => relation.role)
  employeeClinics: EmployeeClinic[]
}

// const data = [
//   { name: 'Clinic Owner', slug: RoleSlugEnum.ClinicOwner },
//   { name: 'Employee Dentist', slug: RoleSlugEnum.EmployeeDentist },
//   { name: 'Employee Manager', slug: RoleSlugEnum.EmployeeManager },
// ]

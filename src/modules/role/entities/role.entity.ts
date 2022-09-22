import { Entity, OneToMany, OneToOne } from 'typeorm'
import { Admin } from '../../admin/entities/admin.entity'
import { Employee } from '../../employee/entities/employee.entity'
import { RolePermission } from '../../role_permission/entities/role_permission.entity'
import { RoleDomain } from './role.domain'

@Entity('role')
export class Role extends RoleDomain {
  @OneToMany(() => RolePermission, (relation) => relation.role)
  rolePermissions: RolePermission[]

  @OneToOne(() => Admin, (relation) => relation.role)
  admin: Admin

  @OneToOne(() => Employee, (relation) => relation.role)
  employee: Employee
}

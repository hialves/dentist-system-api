import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { Admin } from '../../admin/entities/admin.entity'
import { Employee } from '../../employee/entities/employee.entity'
import { RolePermission } from '../../role_permission/entities/role_permission.entity'

@Entity('role')
export class Role extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string

  @Column('varchar', { nullable: true })
  slug?: string

  @OneToMany(() => RolePermission, (relation) => relation.role)
  rolePermissions: RolePermission[]

  @OneToOne(() => Admin, (relation) => relation.role)
  admin: Admin

  @OneToOne(() => Employee, (relation) => relation.role)
  employee: Employee
}

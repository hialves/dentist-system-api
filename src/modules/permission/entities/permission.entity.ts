import { Entity, OneToMany } from 'typeorm'
import { RolePermission } from '../../role_permission/entities/role_permission.entity'
import { PermissionDomain } from './permission.domain'

@Entity('permission')
export class Permission extends PermissionDomain {
  @OneToMany(() => RolePermission, (relation) => relation.permission)
  rolePermissions: RolePermission[]
}

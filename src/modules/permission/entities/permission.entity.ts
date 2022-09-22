import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { RolePermission } from '../../role_permission/entities/role_permission.entity'

@Entity('permission')
export class Permission extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string

  @OneToMany(() => RolePermission, (relation) => relation.permission)
  rolePermissions: RolePermission[]
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { Permission } from '../../permission/entities/permission.entity'
import { Role } from '../../role/entities/role.entity'

@Entity('role_permission')
export class RolePermission extends BaseEntity {
  @Column({ nullable: false })
  roleId: number

  @Column({ nullable: false })
  permissionId: number

  @ManyToOne(() => Role, (relation) => relation.rolePermissions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'FK_ROLE_PERMISSION_ROLE_ID', name: 'roleId', referencedColumnName: 'id' })
  role: Role

  @ManyToOne(() => Permission, (relation) => relation.rolePermissions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({
    foreignKeyConstraintName: 'FK_ROLE_PERMISSION_PERMISSION_ID',
    name: 'permissionId',
    referencedColumnName: 'id',
  })
  permission: Permission
}

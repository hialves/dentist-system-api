import { Column } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

export class RolePermissionDomain extends BaseEntity {
  @Column({ nullable: false })
  roleId: number

  @Column({ nullable: false })
  permissionId: number
}

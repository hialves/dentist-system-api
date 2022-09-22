import { Entity, JoinColumn, OneToOne } from 'typeorm'
import { Role } from '../../role/entities/role.entity'
import { AdminDomain } from './admin.domain'

@Entity('admin')
export class Admin extends AdminDomain {
  @OneToOne(() => Role, (relation) => relation.admin, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'FK_ADMIN_ROLE_ID', name: 'roleId', referencedColumnName: 'id' })
  role: Role
}

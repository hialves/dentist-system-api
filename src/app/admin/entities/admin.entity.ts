import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { Role } from '../../role/entities/role.entity'

@Entity('admin')
export class Admin extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false, select: false })
  password: string

  @Column({ nullable: true })
  photo?: string

  @Column({ nullable: false })
  roleId: number

  @Column({ nullable: true })
  recoverPasswordToken?: string

  @Column('timestamp', { nullable: true })
  recoverPasswordTokenExpire?: string

  @OneToOne(() => Role, (relation) => relation.admin, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'FK_ADMIN_ROLE_ID', name: 'roleId', referencedColumnName: 'id' })
  role: Role
}

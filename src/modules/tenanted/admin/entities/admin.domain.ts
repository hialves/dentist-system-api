import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class AdminDomain extends BaseEntity {
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
}

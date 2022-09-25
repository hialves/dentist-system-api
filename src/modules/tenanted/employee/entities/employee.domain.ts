import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class EmployeeDomain extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false })
  document: string

  @Column({ nullable: true })
  cro?: string

  @Column({ nullable: true })
  photo?: string

  @Column({ nullable: true })
  recoverPasswordToken?: string

  @Column('timestamp', { nullable: true })
  recoverPasswordTokenExpire?: string
}

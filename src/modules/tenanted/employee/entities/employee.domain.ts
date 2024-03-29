import { Column, DeleteDateColumn } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'
import { isTestEnv } from '../../../../test/utils/env'

export class EmployeeDomain extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false, select: false })
  password: string

  @Column({ nullable: false })
  document: string

  @Column({ nullable: true })
  cro?: string

  @Column({ nullable: true })
  photo?: string

  @Column({ nullable: true, select: false })
  recoverPasswordToken?: string

  @Column(isTestEnv ? 'datetime' : 'timestamp', { nullable: true, select: false })
  recoverPasswordTokenExpire?: string

  @DeleteDateColumn()
  deletedAt?: string
}

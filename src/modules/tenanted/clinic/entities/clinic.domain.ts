import { Column, DeleteDateColumn } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

export class ClinicDomain extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, length: 14 })
  document: string

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  address?: string

  @Column({ nullable: true })
  icon?: string

  @DeleteDateColumn()
  deletedAt: string
}

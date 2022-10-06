import { Column, DeleteDateColumn } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

export class ProcedureDomain extends BaseEntity {
  @Column({ nullable: false })
  name: string

  // numeric(7,2)
  @Column('numeric', { nullable: false })
  value: number

  @DeleteDateColumn()
  deletedAt?: string
}

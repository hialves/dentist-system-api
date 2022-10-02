import { Column } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

export class StockDomain extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  quantity: number

  @Column({ nullable: true })
  stockCategoryId?: number
}

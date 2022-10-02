import { Column } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

export class StockCategoryDomain extends BaseEntity {
  @Column({ nullable: false })
  name: string
}

import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class MaterialCategoryDomain extends BaseEntity {
  @Column({ nullable: false })
  name: string
}

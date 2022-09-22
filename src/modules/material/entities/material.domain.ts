import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class MaterialDomain extends BaseEntity {
  @Column({ nullable: false })
  material: string

  @Column({ nullable: false })
  quantity: number

  @Column({ nullable: false })
  materialCategoryId: number
}

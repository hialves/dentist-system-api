import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class RoleDomain extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string

  @Column('varchar', { nullable: true })
  slug?: string
}

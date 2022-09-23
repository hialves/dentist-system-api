import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class PermissionDomain extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string

  @Column({ default: true, nullable: false })
  show: boolean
}

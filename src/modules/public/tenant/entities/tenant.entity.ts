import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

@Entity('tenant')
export class Tenant extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string
}

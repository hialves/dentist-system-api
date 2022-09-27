import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

@Entity('tenant')
export class Tenant extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string

  @Column('varchar', { nullable: false })
  schemaName: string

  @Column('varchar', { nullable: false, unique: true })
  schemaExternalRef: string
}

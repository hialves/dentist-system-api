import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class ClinicDomain extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  document: string

  @Column({ nullable: true })
  address?: string

  @Column({ nullable: true })
  icon?: string
}

import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class ClientDomain extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column('varchar', { nullable: true, length: 11, unique: true })
  document?: string

  @Column({ nullable: true })
  photo?: string

  @Column({ nullable: true })
  phone?: string
}

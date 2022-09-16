import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

@Entity('client')
export class Client extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column('varchar', { nullable: true, length: 11 })
  document?: string

  @Column({ nullable: true })
  photo?: string

  @Column({ nullable: true })
  phone?: string
}

import { Column } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

export class ProcedureHistoryDomain extends BaseEntity {
  @Column({ nullable: false })
  procedureId: number

  @Column('numeric', { nullable: true })
  previousValue?: number

  @Column('numeric', { nullable: true })
  newestValue?: number
}

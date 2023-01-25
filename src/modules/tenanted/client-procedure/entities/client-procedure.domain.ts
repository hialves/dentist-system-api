import { Column } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'
import { isTestEnv } from '../../../../test/utils/env'

export class ClientProcedureDomain extends BaseEntity {
  @Column({ nullable: false })
  clientId: number

  @Column({ nullable: false })
  clinicId: number

  @Column({ nullable: false })
  employeeId: number

  @Column({ nullable: false })
  procedureId: number

  // numeric(7,2)
  @Column('numeric')
  value: number

  @Column({ nullable: true, default: false })
  receivedValue?: boolean

  @Column({ nullable: true, default: false })
  executed?: boolean

  @Column(isTestEnv ? 'datetime' : 'timestamp', { nullable: false })
  startDate: string

  @Column(isTestEnv ? 'datetime' : 'timestamp', { nullable: false })
  endDate: string
}

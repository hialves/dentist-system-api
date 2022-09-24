import { Column } from 'typeorm'
import { BaseEntity } from '../../../common/entity'

export class BudgetDomain extends BaseEntity {
  @Column({ nullable: false })
  clientId: number

  @Column({ nullable: false })
  clinicId: number

  @Column({ nullable: false })
  employeeId: number
}

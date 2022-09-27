import { Column } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

export class EmployeeClinicDomain extends BaseEntity {
  @Column({ nullable: false })
  employeeId: number

  @Column({ nullable: false })
  clinicId: number

  @Column({ nullable: true })
  roleId?: number

  // TODO: mudar para default false
  @Column({ nullable: false, default: true })
  active: boolean
}

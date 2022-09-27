import { Column } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'

export enum RoleSlugEnum {
  ClinicOwner = 'clinic_owner',
  EmployeeDentist = 'employee_dentist',
  EmployeeManager = 'employee_manager',
}

export class RoleDomain extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string

  @Column({ type: 'enum', enum: RoleSlugEnum, enumName: 'ROLE_SLUG_ENUM', nullable: true, unique: true })
  slug?: RoleSlugEnum
}

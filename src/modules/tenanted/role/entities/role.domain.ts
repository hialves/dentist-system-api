import { Column, DeleteDateColumn } from 'typeorm'
import { BaseEntity } from '../../../../common/entity'
import { isTestEnv } from '../../../../test/utils/env'

export enum RoleSlugEnum {
  ClinicOwner = 'clinic_owner',
  EmployeeDentist = 'employee_dentist',
  EmployeeManager = 'employee_manager',
}

export class RoleDomain extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string

  @Column({
    type: isTestEnv ? 'varchar' : 'enum',
    enum: RoleSlugEnum,
    enumName: 'ROLE_SLUG_ENUM',
    nullable: true,
    unique: true,
  })
  slug?: RoleSlugEnum

  @DeleteDateColumn()
  deletedAt?: string
}

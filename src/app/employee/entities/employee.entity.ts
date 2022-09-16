import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { EmployeeClinic } from '../../employee_clinic/entities/employee_clinic.entity'
import { Role } from '../../role/entities/role.entity'

@Entity('employee')
export class Employee extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false })
  document: string

  @Column({ nullable: true })
  cro: string

  @Column({ nullable: true })
  photo?: string

  @Column({ nullable: false })
  roleId: number

  @Column({ nullable: true })
  recoverPasswordToken?: string

  @Column('timestamp', { nullable: true })
  recoverPasswordTokenExpire?: string

  @OneToOne(() => Role, (relation) => relation.employee, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'FK_EMPLOYEE_ROLE_ID', name: 'roleId', referencedColumnName: 'id' })
  role: Role

  @OneToMany(() => EmployeeClinic, (relation) => relation.employee)
  employeeClinics: EmployeeClinic[]
}

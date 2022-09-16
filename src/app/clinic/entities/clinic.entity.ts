import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../common/entity'
import { EmployeeClinic } from '../../employee_clinic/entities/employee_clinic.entity'

@Entity('clinic')
export class Clinic extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  document: string

  @Column({ nullable: true })
  address?: string

  @Column({ nullable: true })
  icon?: string

  @OneToMany(() => EmployeeClinic, (relation) => relation.clinic)
  employeeClinics: EmployeeClinic[]
}

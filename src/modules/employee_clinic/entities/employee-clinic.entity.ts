import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Clinic } from '../../clinic/entities/clinic.entity'
import { Employee } from '../../employee/entities/employee.entity'

@Entity('employee_clinic')
export class EmployeeClinic {
  @Column({ nullable: false })
  employeeId: number

  @Column({ nullable: false })
  clinicId: number

  // TODO: mudar para default false
  @Column({ nullable: false, default: true })
  active: boolean

  @ManyToOne(() => Employee, (relation) => relation.employeeClinics)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_EMPLOYEE_CLINIC_EMPLOYEE_ID',
    name: 'employeeId',
    referencedColumnName: 'id',
  })
  employee: Employee

  @ManyToOne(() => Clinic, (relation) => relation.employeeClinics)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_EMPLOYEE_CLINIC_CLINIC_ID',
    name: 'clinicId',
    referencedColumnName: 'id',
  })
  clinic: Clinic
}

import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Clinic } from '../../clinic/entities/clinic.entity'
import { Employee } from '../../employee/entities/employee.entity'
import { EmployeeClinicDomain } from './employee-clinic.domain'

@Entity('employee_clinic')
export class EmployeeClinic extends EmployeeClinicDomain {
  @ManyToOne(() => Employee, (relation) => relation.employeeClinics, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({
    foreignKeyConstraintName: 'FK_EMPLOYEE_CLINIC_EMPLOYEE_ID',
    name: 'employeeId',
    referencedColumnName: 'id',
  })
  employee: Employee

  @ManyToOne(() => Clinic, (relation) => relation.employeeClinics, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({
    foreignKeyConstraintName: 'FK_EMPLOYEE_CLINIC_CLINIC_ID',
    name: 'clinicId',
    referencedColumnName: 'id',
  })
  clinic: Clinic
}

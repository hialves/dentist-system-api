import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm'
import { Clinic } from '../../clinic/entities/clinic.entity'
import { Employee } from '../../employee/entities/employee.entity'
import { Role } from '../../role/entities/role.entity'
import { EmployeeClinicDomain } from './employee-clinic.domain'

@Unique('UQ_EMPLOYEE_CLINIC_EMPLOYEE_ID_CLINIC_ID', ['employeeId', 'clinicId'])
@Entity('employee_clinic')
export class EmployeeClinic extends EmployeeClinicDomain {
  @ManyToOne(() => Role, (relation) => relation.employeeClinics, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'FK_EMPLOYEE_CLINIC_ROLE_ID', name: 'roleId', referencedColumnName: 'id' })
  role: Role

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

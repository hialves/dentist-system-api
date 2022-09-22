import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Client } from '../../client/entities/client.entity'
import { Clinic } from '../../clinic/entities/clinic.entity'
import { Employee } from '../../employee/entities/employee.entity'
import { Procedure } from '../../procedure/entities/procedure.entity'
import { ClientProcedureDomain } from './client-procedure.domain'

@Entity('client_procedure')
export class ClientProcedure extends ClientProcedureDomain {
  @ManyToOne(() => Client, (relation) => relation.clientProcedures)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_CLIENT_PROCEDURE_CLIENT_ID ',
    name: 'clientId',
    referencedColumnName: 'id',
  })
  client: Client

  @ManyToOne(() => Clinic, (relation) => relation.clientProcedures)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_CLIENT_PROCEDURE_CLINIC_ID ',
    name: 'clinicId',
    referencedColumnName: 'id',
  })
  clinic: Clinic

  @ManyToOne(() => Employee, (relation) => relation.clientProcedures)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_CLIENT_PROCEDURE_EMPLOYEE_ID ',
    name: 'employeeId',
    referencedColumnName: 'id',
  })
  employee: Employee

  @ManyToOne(() => Procedure, (relation) => relation.clientProcedures)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_CLIENT_PROCEDURE_PROCEDURE_ID ',
    name: 'procedureId',
    referencedColumnName: 'id',
  })
  procedure: Procedure
}

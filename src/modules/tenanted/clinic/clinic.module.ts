import { Module } from '@nestjs/common'
import { ClinicService } from './clinic.service'
import { ClinicController } from './clinic.controller'
import { Clinic } from './entities/clinic.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientModule } from '../client/client.module'
import { EmployeeModule } from '../employee/employee.module'
import { EmployeeClinicModule } from '../employee_clinic/employee-clinic.module'
import { RoleModule } from '../role/role.module'

@Module({
  imports: [TypeOrmModule.forFeature([Clinic]), ClientModule, EmployeeModule, EmployeeClinicModule, RoleModule],
  controllers: [ClinicController],
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}

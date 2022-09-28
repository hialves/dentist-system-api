import { Module } from '@nestjs/common'
import { EmployeeClinicService } from './employee-clinic.service'
import { EmployeeClinicController } from './employee-clinic.controller'

@Module({
  controllers: [EmployeeClinicController],
  providers: [EmployeeClinicService],
  exports: [EmployeeClinicService],
})
export class EmployeeClinicModule {}

import { Module } from '@nestjs/common';
import { EmployeeClinicService } from './employee_clinic.service';
import { EmployeeClinicController } from './employee_clinic.controller';

@Module({
  controllers: [EmployeeClinicController],
  providers: [EmployeeClinicService]
})
export class EmployeeClinicModule {}

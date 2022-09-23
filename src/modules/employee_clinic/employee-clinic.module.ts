import { Module } from '@nestjs/common'
import { EmployeeClinicService } from './employee-clinic.service'
import { EmployeeClinicController } from './employee-clinic.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmployeeClinic } from './entities/employee-clinic.entity'

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeClinic])],
  controllers: [EmployeeClinicController],
  providers: [EmployeeClinicService],
  exports: [EmployeeClinicService],
})
export class EmployeeClinicModule {}

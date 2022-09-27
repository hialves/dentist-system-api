import { Module } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { EmployeeController } from './employee.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Employee } from './entities/employee.entity'
import { TenantModule } from '../../public/tenant/tenant.module'

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), TenantModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}

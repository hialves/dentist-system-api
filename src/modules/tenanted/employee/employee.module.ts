import { Module } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { EmployeeController } from './employee.controller'
import { TenantModule } from '../../public/tenant/tenant.module'
import { MailModule } from '../../../mail/mail.module'

@Module({
  imports: [TenantModule, MailModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}

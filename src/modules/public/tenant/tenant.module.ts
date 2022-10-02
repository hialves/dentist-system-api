import { forwardRef, Global, Module } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { TenantController } from './tenant.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tenant } from './entities/tenant.entity'
import { RoleModule } from '../../tenanted/role/role.module'
import { ClinicModule } from '../../tenanted/clinic/clinic.module'
import { EmployeeModule } from '../../tenanted/employee/employee.module'
import { EmployeeClinicModule } from '../../tenanted/employee_clinic/employee-clinic.module'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    RoleModule,
    ClinicModule,
    forwardRef(() => EmployeeModule),
    EmployeeClinicModule,
  ],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}

import { Test, TestingModule } from '@nestjs/testing'
import { forwardRef } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from '../../tenanted/role/role.module'
import { ClinicModule } from '../../tenanted/clinic/clinic.module'
import { EmployeeModule } from '../../tenanted/employee/employee.module'
import { EmployeeClinicModule } from '../../tenanted/employee_clinic/employee-clinic.module'
import { Tenant } from './entities/tenant.entity'
import { ConfigModule } from '@nestjs/config'
import { getInMemoryDatabaseConfig } from '../../../test/utils/in-memory-db'

describe('TenantService', () => {
  let service: TenantService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(getInMemoryDatabaseConfig(false)),
        TypeOrmModule.forFeature([Tenant]),
        RoleModule,
        ClinicModule,
        forwardRef(() => EmployeeModule),
        EmployeeClinicModule,
      ],
      providers: [TenantService],
    }).compile()

    service = module.get<TenantService>(TenantService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

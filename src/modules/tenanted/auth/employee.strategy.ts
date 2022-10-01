import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Inject, forwardRef, BadRequestException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request } from 'express'
import { EmployeeService } from '../employee/employee.service'
import { TenantService } from '../../public/tenant/tenant.service'

@Injectable()
export class EmployeeStrategy extends PassportStrategy(Strategy, 'employee') {
  constructor(
    private authService: AuthService,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    private tenantService: TenantService,
  ) {
    super({ usernameField: 'email', passReqToCallback: true })
  }

  async validate(req: Request): Promise<any> {
    const { email, password } = req.body
    const { schemaExternalRef } = req.params
    const tenantDataSource = await this.tenantService.getTenantConnectionByExternalRef(schemaExternalRef)
    const dataSourceOptions: any = tenantDataSource.options
    const tenantSchema: string = dataSourceOptions.schema
    const employee = await this.authService.validateEntity(
      email,
      password,
      this.employeeService,
      await tenantDataSource,
    )

    if (!employee) {
      throw new BadRequestException('Email ou senha inválidos')
    }
    return { ...employee, tenantSchema }
  }
}

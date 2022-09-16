import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Inject, UnauthorizedException, forwardRef } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request } from 'express'
import { EmployeeService } from '../employee/employee.service'

@Injectable()
export class EmployeeStrategy extends PassportStrategy(Strategy, 'employee') {
  constructor(
    private authService: AuthService,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
  ) {
    super({ usernameField: 'email', passReqToCallback: true })
  }

  async validate(req: Request): Promise<any> {
    const { email, password } = req.body

    const employee = await this.authService.validateEntity(email, password, this.employeeService)
    if (!employee) {
      throw new UnauthorizedException()
    }
    return employee
  }
}

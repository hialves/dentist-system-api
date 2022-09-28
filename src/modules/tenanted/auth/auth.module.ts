import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EmployeeModule } from '../employee/employee.module'
import { EmployeeClinicModule } from '../employee_clinic/employee-clinic.module'
import { RoleModule } from '../role/role.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { EmployeeStrategy } from './employee.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    EmployeeModule,
    EmployeeClinicModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
    }),
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmployeeStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

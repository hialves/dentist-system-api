import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AdminModule } from '../admin/admin.module'
import { EmployeeModule } from '../employee/employee.module'
import { AdminStrategy } from './admin.strategy'
import { AuthService } from './auth.service'
import { EmployeeStrategy } from './employee.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    forwardRef(() => AdminModule),
    EmployeeModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
    }),
  ],
  providers: [AuthService, EmployeeStrategy, JwtStrategy, AdminStrategy],
  exports: [AuthService],
})
export class AuthModule {}

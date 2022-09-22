import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Inject, UnauthorizedException, forwardRef } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AdminService } from '../admin/admin.service'

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    private authService: AuthService,
    @Inject(forwardRef(() => AdminService))
    private adminService: AdminService,
  ) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    const admin = await this.authService.validateEntity(email, password, this.adminService)

    if (!admin) {
      throw new UnauthorizedException()
    }
    return admin
  }
}

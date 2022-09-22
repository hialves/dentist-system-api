import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PERMISSION_KEY } from '../../decorators/permission.decorator'
import { JwtPayload } from '../../interfaces/jwt.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<string>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredPermission) {
      return true
    }
    const { user }: { user: JwtPayload } = context.switchToHttp().getRequest()
    return user.permissions.some((permission) => permission === requiredPermission)
  }
}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { sufixPermissions } from '../../../config/permissions'
import { PERMISSION_KEY } from '../../../decorators/permission.decorator'
import { IRequest } from '../../../interfaces/request.interface'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<string>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredPermission) {
      return true
    }
    const [controller] = requiredPermission.split('_')
    const { user } = context.switchToHttp().getRequest() as IRequest

    return user.permissions.some(
      (permission) => permission === `${controller}_${sufixPermissions.Manage}` || permission === requiredPermission,
    )
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TenantService } from '../modules/public/tenant/tenant.service'

export const TenantConnection = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as Express.Request
  return TenantService.getTenantConnection(request.user.tenantSchema)
})

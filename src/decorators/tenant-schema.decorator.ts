import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const TenantSchema = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as Express.Request
  return request.user.tenantSchema
})

import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const LoggedUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as Express.Request
  return request.user
})

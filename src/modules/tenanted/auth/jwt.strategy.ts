import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IAccessToken, JwtPayload } from '../../../@types/custom'
import { RoleService } from '../role/role.service'
import { TenantService } from '../../public/tenant/tenant.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private roleService: RoleService, private tenantService: TenantService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    })
  }

  async validate(payload: IAccessToken): Promise<JwtPayload> {
    const tenantDataSource = await this.tenantService.getTenantConnectionBySchemaName(payload.tenantSchema)
    const permissions = await this.roleService.getRolePermissions(payload.roleId, tenantDataSource)

    return { ...payload, permissions }
  }
}

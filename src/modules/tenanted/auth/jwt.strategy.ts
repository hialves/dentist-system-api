import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IAccessToken, JwtPayload } from '../../../@types/custom'
import { RoleService } from '../role/role.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private roleService: RoleService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    })
  }

  async validate(payload: IAccessToken): Promise<JwtPayload> {
    const permissions = await this.roleService.getRolePermissions(payload.roleId)

    return { ...payload, permissions }
  }
}

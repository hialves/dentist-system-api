import { IsNotEmpty } from 'class-validator'
import { RoleSlugEnum } from '../entities/role.domain'

export class CreateRoleDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  slug: RoleSlugEnum
}

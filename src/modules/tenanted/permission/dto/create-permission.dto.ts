import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreatePermissionDto {
  @IsNotEmpty()
  name: string

  @IsOptional()
  show?: boolean = true
}

import { PartialType } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

class UpdateDto {
  @IsOptional()
  name: string

  @IsOptional()
  schemaExternalRef: string
}

export class UpdateTenantDto extends PartialType(UpdateDto) {}

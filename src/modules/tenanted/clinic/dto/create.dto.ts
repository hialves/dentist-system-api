import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateClinicDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  document: string

  @IsOptional()
  phone?: string

  @IsOptional()
  address?: string
}

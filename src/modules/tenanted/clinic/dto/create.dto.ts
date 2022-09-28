import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateClinicDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  document: string

  @IsOptional()
  address?: string
}

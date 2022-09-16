import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateClientDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  email: string

  @IsOptional()
  document?: string

  @IsOptional()
  photo?: string

  @IsOptional()
  phone?: string
}

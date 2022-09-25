import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateClientDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsOptional()
  document?: string

  @IsOptional()
  phone?: string
}

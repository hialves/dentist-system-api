import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  document: string

  @IsOptional()
  cro?: string
}

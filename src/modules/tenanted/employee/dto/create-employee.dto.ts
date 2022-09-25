import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator'

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  password: string

  @IsNotEmpty()
  document: string

  @IsOptional()
  cro?: string
}

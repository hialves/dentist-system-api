import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

// TODO: role
export class CreateEmployeeInternalDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  document: string

  @IsOptional()
  cro?: string
}

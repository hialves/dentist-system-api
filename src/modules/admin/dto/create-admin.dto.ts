import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateAdminDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  password: string
}

import { IsNotEmpty, MinLength } from 'class-validator'

export class RecoverPasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  password: string
}

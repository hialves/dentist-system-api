import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateProcedureDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsNumber()
  value: number
}

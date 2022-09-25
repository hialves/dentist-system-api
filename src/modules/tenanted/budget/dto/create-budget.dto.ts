import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator'

export class CreateBudgetDto {
  @IsNotEmpty()
  clientId: number

  @IsNotEmpty()
  clinicId: number

  @IsArray()
  @ArrayNotEmpty()
  procedureIds: number[]

  @IsNotEmpty()
  employeeId: number
}

import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator'

export class CreateBudgetDto {
  @IsNotEmpty()
  clientId: number

  @IsNotEmpty()
  clinicId: number

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  procedureIds: number[]
}

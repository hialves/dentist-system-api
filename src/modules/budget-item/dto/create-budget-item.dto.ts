import { IsNotEmpty } from 'class-validator'

export class CreateBudgetItemDto {
  @IsNotEmpty()
  budgetId: number

  @IsNotEmpty()
  procedureIds: number[]
}

import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateStockDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  quantity: number

  @IsOptional()
  stockCategoryId?: number
}

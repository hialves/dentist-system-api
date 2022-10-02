import { ArrayNotEmpty, IsArray } from 'class-validator'

export class CreateStockCategoryDto {
  @ArrayNotEmpty()
  @IsArray()
  names: string[]
}

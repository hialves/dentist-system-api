import { ArrayNotEmpty, IsArray } from 'class-validator'

export class CreateMaterialCategoryDto {
  @ArrayNotEmpty()
  @IsArray()
  names: string[]
}

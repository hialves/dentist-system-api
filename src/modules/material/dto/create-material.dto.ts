import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateMaterialDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  quantity: number

  @IsOptional()
  materialCategoryId?: number
}

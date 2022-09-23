import { IsNotEmpty } from 'class-validator'

export class FinalizeLoginDto {
  @IsNotEmpty()
  clinicId: number
}

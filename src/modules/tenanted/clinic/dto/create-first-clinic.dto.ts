import { IsNotEmpty, IsOptional } from 'class-validator'
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto'

export class ClinicFieldDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  document: string

  @IsOptional()
  address?: string
}

export class CreateFirstClinicDto {
  employee: CreateEmployeeDto
  clinic: ClinicFieldDto
}

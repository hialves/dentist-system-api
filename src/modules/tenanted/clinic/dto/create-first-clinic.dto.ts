import { IsNotEmptyObject } from 'class-validator'
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto'
import { CreateClinicDto } from './create.dto'

export class CreateFirstClinicDto {
  @IsNotEmptyObject()
  employee: CreateEmployeeDto

  @IsNotEmptyObject()
  clinic: CreateClinicDto
}

import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto'
import { CreateClinicDto } from './create.dto'

export class CreateFirstClinicDto {
  employee: CreateEmployeeDto
  clinic: CreateClinicDto
}

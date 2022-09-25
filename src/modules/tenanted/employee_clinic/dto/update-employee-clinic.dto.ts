import { PartialType } from '@nestjs/swagger'
import { CreateEmployeeClinicDto } from './create-employee-clinic.dto'

export class UpdateEmployeeClinicDto extends PartialType(CreateEmployeeClinicDto) {}

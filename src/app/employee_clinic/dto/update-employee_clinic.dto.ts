import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeClinicDto } from './create-employee_clinic.dto';

export class UpdateEmployeeClinicDto extends PartialType(CreateEmployeeClinicDto) {}

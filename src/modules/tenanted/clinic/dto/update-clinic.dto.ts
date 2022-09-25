import { PartialType } from '@nestjs/swagger'
import { CreateFirstClinicDto } from './create-first-clinic.dto'

export class UpdateClinicDto extends PartialType(CreateFirstClinicDto) {}

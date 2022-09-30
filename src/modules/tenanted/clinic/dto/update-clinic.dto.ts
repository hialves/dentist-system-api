import { PartialType } from '@nestjs/swagger'
import { ClinicFieldDto } from './create-first-clinic.dto'

export class UpdateClinicDto extends PartialType(ClinicFieldDto) {}

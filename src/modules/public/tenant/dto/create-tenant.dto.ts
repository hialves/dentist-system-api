import { Column } from 'typeorm'
import { CreateFirstClinicDto } from '../../../tenanted/clinic/dto/create-first-clinic.dto'

export class CreateTenantDto extends CreateFirstClinicDto {}
